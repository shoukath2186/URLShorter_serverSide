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
exports.UrlRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const url_schema_1 = require("../schema/url.schema");
let UrlRepository = class UrlRepository {
    constructor(_urlModel) {
        this._urlModel = _urlModel;
    }
    async findExistingLink(customUrl) {
        return await this._urlModel.findOne({
            $or: [{ shortenedLink: customUrl }, { customLink: customUrl }],
        });
    }
    async createLink(userId, createLinkDto, shortenedLink) {
        const { title, longUrl, customUrl, qrCode } = createLinkDto;
        const changedUserId = new mongoose_2.Types.ObjectId(userId);
        const newLink = new this._urlModel({
            userId: changedUserId,
            title,
            originalLink: longUrl,
            shortenedLink,
            customLink: customUrl,
            qrCode,
            clickCount: 0,
        });
        return newLink.save();
    }
    async findByOriginalUrl(longUrl) {
        return this._urlModel.findOne({ originalLink: longUrl });
    }
    async findUserLinks(userId) {
        return await this._urlModel
            .find({ userId: userId })
            .sort({ createdAt: -1 });
    }
};
exports.UrlRepository = UrlRepository;
exports.UrlRepository = UrlRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(url_schema_1.Url.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UrlRepository);
//# sourceMappingURL=url.repository.js.map