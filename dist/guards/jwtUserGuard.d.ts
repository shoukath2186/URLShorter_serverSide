import { ExecutionContext } from '@nestjs/common';
import { UserRepository } from 'src/user/repository/user.repository';
declare const JwtUserGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtUserGuard extends JwtUserGuard_base {
    private readonly _userRepository;
    constructor(_userRepository: UserRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
