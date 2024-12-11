"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_registration_1 = require("../dto/user.registration");
const user_repository_1 = require("../repository/user.repository");
const generateToken_1 = require("../utils/generateToken");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
let UserService = class UserService {
    constructor(_userRepository, jwtService) {
        this._userRepository = _userRepository;
        this.jwtService = jwtService;
    }
    async registerUser(res, userDetails) {
        try {
            const existingVerifiedUser = await this._userRepository.findByEmail(userDetails.email);
            if (existingVerifiedUser) {
                throw new common_1.ConflictException('A user with this email already exists');
            }
            const user = await this._userRepository.createUser(userDetails);
            if (user) {
                (0, generateToken_1.generateToken)(res, user._id, 'userJwt', this.jwtService);
            }
            return user;
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('An unexpected error occurred while registering the user.');
        }
    }
    async loginUser(LoginDto, res) {
        try {
            const { password } = LoginDto;
            const user = await this._userRepository.findUser(LoginDto);
            if (!user) {
                throw new common_1.ConflictException('You are not a user, please sign up');
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                throw new common_1.ConflictException('Incorrect Password');
            }
            if (user) {
                (0, generateToken_1.generateToken)(res, user._id, 'userJwt', this.jwtService);
            }
            return user;
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('An unexpected error occurred while login the user.');
            }
        }
    }
    async userlogOut(res) {
        try {
            (0, generateToken_1.clearTokenCookies)(res);
            return { message: 'Logged out successfully' };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.UserService = UserService;
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_registration_1.UserRegistrationDto]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "registerUser", null);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map