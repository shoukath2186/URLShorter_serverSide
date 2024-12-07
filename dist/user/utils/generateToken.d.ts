import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Types } from 'mongoose';
export declare function generateToken(res: Response, userId: Types.ObjectId, tokenName: string, jwtService: JwtService): Promise<void>;
export declare function clearTokenCookies(res: Response): void;
