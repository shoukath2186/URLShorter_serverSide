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
exports.UrlService = void 0;
const common_1 = require("@nestjs/common");
const url_schema_1 = require("../schema/url.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const url_repository_1 = require("../repository/url.repository");
let UrlService = class UrlService {
    constructor(_urlRepository, _urlModel) {
        this._urlRepository = _urlRepository;
        this._urlModel = _urlModel;
    }
    async generateUniqueShortLink(customUrl) {
        if (customUrl) {
            const existingLink = await this._urlRepository.findExistingLink(customUrl);
            if (existingLink) {
                const suffix = Math.random().toString(36).substring(2, 6);
                return `${customUrl}-${suffix}`;
            }
            return customUrl;
        }
        while (true) {
            const shortLink = Math.random().toString(36).substring(2, 6);
            const existingLink = await this._urlModel.findOne({
                shortenedLink: shortLink,
            });
            if (!existingLink) {
                return shortLink;
            }
        }
    }
    async createLink(userId, createLinkDto) {
        try {
            const existingLink = await this._urlRepository.findByOriginalUrl(createLinkDto.longUrl);
            if (existingLink) {
                throw new common_1.ConflictException('A short link already exists for this URL');
            }
            const shortenedLink = await this.generateUniqueShortLink(createLinkDto.customUrl);
            const link = await this._urlRepository.createLink(userId, createLinkDto, shortenedLink);
            return link;
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
    async getUserLinks(userId) {
        try {
            const links = await this._urlRepository.findUserLinks(userId);
            return links;
        }
        catch (error) {
            console.error('error in take userliks', error);
        }
    }
    async deleteLink(id) {
        const deletedLink = await this._urlModel.findByIdAndDelete(id);
        if (!deletedLink) {
            throw new common_1.NotFoundException('Link not found');
        }
        return { message: 'Link deleted successfully' };
    }
};
exports.UrlService = UrlService;
exports.UrlService = UrlService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(url_schema_1.Url.name)),
    __metadata("design:paramtypes", [url_repository_1.UrlRepository,
        mongoose_2.Model])
], UrlService);
//# sourceMappingURL=url.service.js.map