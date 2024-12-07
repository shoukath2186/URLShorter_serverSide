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
exports.UrlController = void 0;
const common_1 = require("@nestjs/common");
const jwtUserGuard_1 = require("../../guards/jwtUserGuard");
const createLink_dto_1 = require("../dto/createLink.dto");
const url_service_1 = require("../service/url.service");
let UrlController = class UrlController {
    constructor(_urlService) {
        this._urlService = _urlService;
    }
    async createLink(request, res, createLinkDto) {
        try {
            const userId = request.user._id;
            const link = await this._urlService.createLink(userId, createLinkDto);
            if (link) {
                res.status(200).json({
                    success: true,
                    message: 'Link created successfully.',
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: 'Failed to create a new link. Please try again.',
                });
            }
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
    async getLinks(request, res) {
        const userId = request.user._id;
        const links = await this._urlService.getUserLinks(userId);
        return res.status(200).json({
            success: true,
            data: links,
        });
    }
    async deleteLink(id, res) {
        const data = await this._urlService.deleteLink(id);
        if (data) {
            res.status(200).json({
                success: true,
                message: data.message,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: 'Failed to delete a new link. Please try again.',
            });
        }
    }
};
exports.UrlController = UrlController;
__decorate([
    (0, common_1.Post)('createLink'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, createLink_dto_1.CreateLinkDto]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "createLink", null);
__decorate([
    (0, common_1.Get)('getLinks'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "getLinks", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "deleteLink", null);
exports.UrlController = UrlController = __decorate([
    (0, common_1.UseGuards)(jwtUserGuard_1.JwtUserGuard),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [url_service_1.UrlService])
], UrlController);
//# sourceMappingURL=url.controller.js.map