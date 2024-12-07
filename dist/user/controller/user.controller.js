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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_registration_1 = require("../dto/user.registration");
const user_login_1 = require("../dto/user.login");
const user_service_1 = require("../service/user.service");
const jwtUserGuard_1 = require("../../guards/jwtUserGuard");
let UserController = class UserController {
    constructor(_userService) {
        this._userService = _userService;
    }
    async register(userDto, res) {
        try {
            const user = await this._userService.registerUser(res, userDto);
            const { userName, image } = user;
            return res.status(201).json({
                success: true,
                data: { userName, image },
            });
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                res.status(409).json({
                    success: false,
                    message: error.message,
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: error.message || 'Internal Server Error',
                });
            }
        }
    }
    async login(loginDto, res) {
        try {
            const user = await this._userService.loginUser(loginDto, res);
            const { userName, image } = user;
            res.status(201).json({
                success: true,
                data: { userName, image },
            });
            return;
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                res.status(409).json({
                    success: false,
                    message: error.message,
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: error.message || 'Internal Server Error',
                });
            }
        }
    }
    async logOut(res) {
        const response = await this._userService.userlogOut(res);
        return response;
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_registration_1.UserRegistrationDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_login_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwtUserGuard_1.JwtUserGuard),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logOut", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map