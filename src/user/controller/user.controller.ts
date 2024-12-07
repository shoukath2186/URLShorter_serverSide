import { Body, ConflictException, Controller, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserRegistrationDto } from '../dto/user.registration';
import { LoginDto } from '../dto/user.login';
import { UserService } from '../service/user.service';
import { Response } from 'express';
import { JwtUserGuard } from 'src/guards/jwtUserGuard';


@Controller('user')

export class UserController {
    constructor(private readonly _userService: UserService) { }

    @Post('register')
    async register(@Body() userDto: UserRegistrationDto, @Res() res: Response) {

        try {
            //console.log('Received DTO:', userDto);
            const user = await this._userService.registerUser(res, userDto);
            const { userName, image } = user;

            return res.status(201).json({
                success: true,
                data: { userName, image },
            });
        } catch (error) {
            //console.error('Error in register:', error.message);

            if (error instanceof ConflictException) {
                 res.status(409).json({
                    success: false,
                    message: error.message,
                });
            }else{
             res.status(500).json({
                success: false,
                message: error.message || 'Internal Server Error',
            });
        }
        }
    }
    @Post('login')
    async login(
        @Body() loginDto: LoginDto,
        @Res({ passthrough: true }) res: Response
    ) {
        try {
            // console.log(loginDto);

            const user = await this._userService.loginUser(loginDto, res);

            const { userName, image } = user;

            //  console.log(userName, image);

             res.status(201).json({
                success: true,
                data: { userName, image },
            });
             return

        } catch (error) {
            //console.error('Error in register:', error.message);

            if (error instanceof ConflictException) {
                 res.status(409).json({
                    success: false,
                    message: error.message,
                });
            } else {

                // Handle generic exceptions
                 res.status(500).json({
                    success: false,
                    message: error.message || 'Internal Server Error',
                });
            }
        }
    }
    @UseGuards(JwtUserGuard)
    @Post('logout')
    async logOut(@Res({ passthrough: true }) res: Response) {
        const response = await this._userService.userlogOut(res);
        return response;
    }

}