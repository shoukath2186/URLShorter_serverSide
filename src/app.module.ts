import { Module,Logger } from '@nestjs/common';
import { ConfigModule,ConfigService  } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env', 
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const logger = new Logger('MongooseModule');
        const uri = configService.get<string>('MONGO_URI'); 
        logger.log(`Connecting to MongoDB at ${uri}`);
        if (!uri) {
          throw new Error('MONGO_URI is not defined in the environment variables.');
        }
        return { uri };
      },
      inject: [ConfigService],
    }),
  
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
