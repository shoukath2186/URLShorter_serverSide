import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    Res,
    UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { UserRegistrationDto } from '../dto/user.registration';
import { UserRepository } from '../repository/user.repository';
import { LoginDto } from '../dto/user.login';
import { clearTokenCookies, generateToken } from '../utils/generateToken';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UserService {
    constructor(
        private readonly _userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) { }


    async registerUser(@Res() res: Response, userDetails: UserRegistrationDto) {
        try {
            // console.log('successfull');
            const existingVerifiedUser = await this._userRepository.findByEmail(
                userDetails.email,
            );
            if (existingVerifiedUser) {
                throw new ConflictException('A user with this email already exists');
            }

            const user = await this._userRepository.createUser(userDetails);
            // console.log('userID', typeof user._id);
            if (user) {
                generateToken(
                    res,
                    user._id as Types.ObjectId,
                    'userJwt',
                    this.jwtService,
                );
            }
            return user;
        } catch (error) {
            // console.log('error', error.message);
            if (error instanceof ConflictException) {
                throw error;
            }


            throw new InternalServerErrorException(
                'An unexpected error occurred while registering the user.'
            );
        }

    }
    async loginUser(LoginDto: LoginDto, res: Response) {
        try {

            const { password } = LoginDto;
            const user = await this._userRepository.findUser(LoginDto);

            if (!user) {
                throw new ConflictException('You are not a user, please sign up');
            }
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                throw new ConflictException('Incorrect Password');
            }
            if (user) {
                generateToken(
                    res,
                    user._id as Types.ObjectId,
                    'userJwt',
                    this.jwtService,
                );
            }

            return user;
        } catch (error) {
            // console.log('error', error.message);
            if (error instanceof ConflictException) {
                throw error;
            } else {


                throw new InternalServerErrorException(
                    'An unexpected error occurred while login the user.'
                );
            }
        }
    }
    async userlogOut(res: Response): Promise<{ message: string }> {
        try {
            clearTokenCookies(res);
            return { message: 'Logged out successfully' };
        } catch (error) {
            throw error;
        }
    }

}