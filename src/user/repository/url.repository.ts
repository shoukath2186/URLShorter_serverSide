import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Url } from '../schema/url.schema';
import { CreateLinkDto } from '../dto/createLink.dto';

@Injectable()
export class UrlRepository {

    constructor(
        @InjectModel(Url.name)
        private _urlModel: Model<Url>,
    ) { }

    async findExistingLink(customUrl: string) {
        return await this._urlModel.findOne({
            $or: [{ shortenedLink: customUrl }, { customLink: customUrl }],
        });
    }
    async createLink(
        userId: string,
        createLinkDto: CreateLinkDto,
        shortenedLink: string,
    ) {
        const { title, longUrl, customUrl, qrCode } = createLinkDto;

        const changedUserId = new Types.ObjectId(userId);

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

    async findByOriginalUrl(longUrl: string): Promise<Url | null> {
        return this._urlModel.findOne({ originalLink: longUrl });
    }
    async findUserLinks(userId: Types.ObjectId){
        return await this._urlModel
      .find({ userId: userId })
      .sort({ createdAt: -1 })
    }



}