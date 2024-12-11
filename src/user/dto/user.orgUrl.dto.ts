import {  IsString } from 'class-validator';

export class ShortUrl{
    @IsString()
    url:string
}