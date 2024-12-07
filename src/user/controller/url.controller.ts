import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtUserGuard } from 'src/guards/jwtUserGuard';
import { CreateLinkDto } from '../dto/createLink.dto';
import { UrlService } from '../service/url.service';

@UseGuards(JwtUserGuard)
@Controller('user')
export class UrlController {
  constructor(private readonly _urlService: UrlService) { }

  @Post('createLink')
  async createLink(@Req() request, @Res() res: Response, @Body() createLinkDto: CreateLinkDto) {
    try {

      const userId = request.user._id;
      const link = await this._urlService.createLink(userId, createLinkDto);
      if (link) {
        res.status(200).json({
          success: true,
          message: 'Link created successfully.',
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Failed to create a new link. Please try again.',
        });
      }
      return
    } catch (error) {
     // console.error('Error in link cratetion:', error.message);

      if (error instanceof ConflictException) {
        res.status(409).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: error.message || 'Internal Server Error',
        });
      }
    }

  }
  @Get('getLinks')
  async getLinks(@Req() request, @Res() res: Response){
    const userId = request.user._id;
    const links = await this._urlService.getUserLinks(userId);
    return res.status(200).json({
      success: true,
      data: links,
    });
  }
  @Delete(':id')
  async deleteLink(@Param('id') id: string,@Res() res: Response) {
    const data= await this._urlService.deleteLink(id);
    if (data) {
      res.status(200).json({
        success: true,
        message: data.message,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to delete a new link. Please try again.',
      });
    }
  }

}