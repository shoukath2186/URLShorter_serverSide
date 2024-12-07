import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import * as jwt from 'jsonwebtoken';
  import { Types } from 'mongoose';
  import { UserRepository } from 'src/user/repository/user.repository';
  
  @Injectable()
  export class JwtUserGuard extends AuthGuard('userJwt') {
    constructor(private readonly _userRepository: UserRepository) {
      super();
    }
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = request.cookies ? request.cookies.userJwt : null;
      //console.log(token);
      
      if (!token) {
        throw new UnauthorizedException('User Token Not Found');
      }
  
      try {
        const secretKey = process.env.JWT_SECRET;
  
        if (!secretKey) {
          throw new Error(
            'JWT secret is not configured in environment variables',
          );
        }
  
        const decoded = jwt.verify(token, secretKey) as { userId: string };
  
        const userId = new Types.ObjectId(decoded.userId);
        const user = await this._userRepository.findJwtUserById(userId);
  
       // console.log(user);
  
        if (!user) {
          throw new UnauthorizedException('User not found');
        }
  
        request.user = user;
   
        return true;
      } catch (error) {
        console.error('JWT Verification Error:', error);
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  }