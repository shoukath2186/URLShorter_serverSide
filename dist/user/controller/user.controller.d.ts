import { UserRegistrationDto } from '../dto/user.registration';
import { LoginDto } from '../dto/user.login';
import { UserService } from '../service/user.service';
import { Response } from 'express';
export declare class UserController {
    private readonly _userService;
    constructor(_userService: UserService);
    register(userDto: UserRegistrationDto, res: Response): Promise<Response<any, Record<string, any>>>;
    login(loginDto: LoginDto, res: Response): Promise<void>;
    logOut(res: Response): Promise<{
        message: string;
    }>;
}
