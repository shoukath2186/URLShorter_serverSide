import { Document } from 'mongoose';
import { User } from './user.schema';
export declare class Url extends Document {
    userId: User;
    title: string;
    originalLink: string;
    shortenedLink: string;
    customLink?: string;
    qrCode?: string;
    clickCount: number;
}
export declare const UrlSchema: import("mongoose").Schema<Url, import("mongoose").Model<Url, any, any, any, Document<unknown, any, Url> & Url & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Url, Document<unknown, {}, import("mongoose").FlatRecord<Url>> & import("mongoose").FlatRecord<Url> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
