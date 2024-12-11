import { Model, Types } from 'mongoose';
import { Url } from '../schema/url.schema';
import { CreateLinkDto } from '../dto/createLink.dto';
import { ShortUrl } from '../dto/user.orgUrl.dto';
export declare class UrlRepository {
    private _urlModel;
    constructor(_urlModel: Model<Url>);
    findExistingLink(customUrl: string): Promise<import("mongoose").Document<unknown, {}, Url> & Url & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    createLink(userId: string, createLinkDto: CreateLinkDto, shortenedLink: string): Promise<import("mongoose").Document<unknown, {}, Url> & Url & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findByOriginalUrl(longUrl: string): Promise<Url | null>;
    findUserLinks(userId: Types.ObjectId): Promise<(import("mongoose").Document<unknown, {}, Url> & Url & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    takeOrgUrl(ShortUrl: ShortUrl): Promise<string | (import("mongoose").Document<unknown, {}, Url> & Url & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })>;
}
