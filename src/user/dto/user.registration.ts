import { IsEmail, IsString } from 'class-validator';

export class UserRegistrationDto {
  @IsString()
  userName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}