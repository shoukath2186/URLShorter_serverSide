import { User } from '../schema/user.schema';
import { Model, Types } from 'mongoose';
import { UserInterface } from '../interface/user.interface';
import { UserRegistrationDto } from '../dto/user.registration';
import { LoginDto } from '../dto/user.login';
export declare class UserRepository {
    private _userModel;
    constructor(_userModel: Model<User>);
    findByEmail(email: string): Promise<UserInterface>;
    createUser(userDetails: UserRegistrationDto): Promise<User>;
    findUser(userData: LoginDto): Promise<User | null>;
    findJwtUserById(userId: Types.ObjectId): Promise<User>;
}
