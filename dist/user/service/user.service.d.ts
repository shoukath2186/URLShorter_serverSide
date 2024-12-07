import { Response } from 'express';
import { UserRegistrationDto } from '../dto/user.registration';
import { UserRepository } from '../repository/user.repository';
import { LoginDto } from '../dto/user.login';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private readonly _userRepository;
    private readonly jwtService;
    constructor(_userRepository: UserRepository, jwtService: JwtService);
    registerUser(res: Response, userDetails: UserRegistrationDto): Promise<import("../schema/user.schema").User>;
    loginUser(LoginDto: LoginDto, res: Response): Promise<import("../schema/user.schema").User>;
    userlogOut(res: Response): Promise<{
        message: string;
    }>;
}
