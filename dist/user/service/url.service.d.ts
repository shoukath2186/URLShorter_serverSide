import { CreateLinkDto } from '../dto/createLink.dto';
import { Url } from '../schema/url.schema';
import { Model, Types } from 'mongoose';
import { UrlRepository } from '../repository/url.repository';
export declare class UrlService {
    private readonly _urlRepository;
    private _urlModel;
    constructor(_urlRepository: UrlRepository, _urlModel: Model<Url>);
    private generateUniqueShortLink;
    createLink(userId: string, createLinkDto: CreateLinkDto): Promise<import("mongoose").Document<unknown, {}, Url> & Url & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getUserLinks(userId: Types.ObjectId): Promise<(import("mongoose").Document<unknown, {}, Url> & Url & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    deleteLink(id: string): Promise<{
        message: string;
    }>;
}
