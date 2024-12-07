import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { CreateLinkDto } from '../dto/createLink.dto';
import { Url } from '../schema/url.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UrlRepository } from '../repository/url.repository';


@Injectable()
export class UrlService {
    constructor(
        private readonly _urlRepository: UrlRepository,
        @InjectModel(Url.name)
        private _urlModel: Model<Url>,
      ) {}

      private async generateUniqueShortLink(customUrl?: string): Promise<string> {
        if (customUrl) {
          const existingLink =
            await this._urlRepository.findExistingLink(customUrl);
    
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

      async createLink(userId: string, createLinkDto: CreateLinkDto) {
        try {

            const existingLink = await this._urlRepository.findByOriginalUrl(
                createLinkDto.longUrl,
              );
          
              if (existingLink) {
                throw new ConflictException('A short link already exists for this URL');
              }
              const shortenedLink = await this.generateUniqueShortLink(
                createLinkDto.customUrl,
              );
              const link = await this._urlRepository.createLink(
                userId,
                createLinkDto,
                shortenedLink,
              );
              return link;
            
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            } else {
                throw new InternalServerErrorException(
                    'An unexpected error occurred while login the user.'
                );
            }
        }
        
      }

      async getUserLinks(userId: Types.ObjectId){
        try {
            const links = await this._urlRepository.findUserLinks(userId);
            return links
        } catch (error) {
         console.error('error in take userliks',error)   
        }
        
      }
      async deleteLink(id: string) {
        const deletedLink = await this._urlModel.findByIdAndDelete(id);
        if (!deletedLink) {
          throw new NotFoundException('Link not found');
        }
        return { message: 'Link deleted successfully' };
      }
}