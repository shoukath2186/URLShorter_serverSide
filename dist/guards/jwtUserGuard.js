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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtUserGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt = require("jsonwebtoken");
const mongoose_1 = require("mongoose");
const user_repository_1 = require("../user/repository/user.repository");
let JwtUserGuard = class JwtUserGuard extends (0, passport_1.AuthGuard)('userJwt') {
    constructor(_userRepository) {
        super();
        this._userRepository = _userRepository;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = request.cookies ? request.cookies.userJwt : null;
        if (!token) {
            throw new common_1.UnauthorizedException('User Token Not Found');
        }
        try {
            const secretKey = process.env.JWT_SECRET;
            if (!secretKey) {
                throw new Error('JWT secret is not configured in environment variables');
            }
            const decoded = jwt.verify(token, secretKey);
            const userId = new mongoose_1.Types.ObjectId(decoded.userId);
            const user = await this._userRepository.findJwtUserById(userId);
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            request.user = user;
            return true;
        }
        catch (error) {
            console.error('JWT Verification Error:', error);
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
};
exports.JwtUserGuard = JwtUserGuard;
exports.JwtUserGuard = JwtUserGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], JwtUserGuard);
//# sourceMappingURL=jwtUserGuard.js.map