import { IsString, IsOptional, IsUrl, IsNotEmpty } from 'class-validator';

export class CreateLinkDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  // @IsUrl()
  longUrl: string;

  @IsOptional()
  @IsString()
  customUrl?: string;

  @IsOptional()
  @IsString()
  qrCode?: string;
}