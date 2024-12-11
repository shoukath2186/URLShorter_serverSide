import { Response } from 'express';
import { CreateLinkDto } from '../dto/createLink.dto';
import { ShortUrl } from '../dto/user.orgUrl.dto';
import { UrlService } from '../service/url.service';
export declare class UrlController {
    private readonly _urlService;
    constructor(_urlService: UrlService);
    createLink(request: any, res: Response, createLinkDto: CreateLinkDto): Promise<void>;
    getLinks(request: any, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteLink(id: string, res: Response): Promise<void>;
    takeUserUrl(request: any, res: Response, ShortUrl: ShortUrl): Promise<void>;
}
