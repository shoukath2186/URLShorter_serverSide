import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserRepository } from './repository/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UrlController } from './controller/url.controller';
import { UrlService } from './service/url.service';
import { UrlRepository } from './repository/url.repository';
import { UrlSchema } from './schema/url.schema';

@Module({
  imports: [

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (ConfigService: ConfigService) => ({
        global: true,
        secret: ConfigService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: ConfigService.get<string>('JWT_EXPIRATION'),
        },
      }),
      inject: [ConfigService],
    }),


    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Url', schema: UrlSchema },
    ]),
  ],
  controllers: [UserController,UrlController],
  providers: [UserService, UserRepository,UrlService,UrlRepository]
})
export class UserModule { }
