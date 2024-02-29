import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dtos';
import { UserEntity } from './entities/user.entity';
import { Response } from 'express';
import { TOKEN_NAME } from './constants/jwt-constants';
import { AuthGuard } from './guards/auth.guard';
import { LoginControllerResponse } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<UserEntity> {
    const existingUser = await this.authService.findByEmail(registerDto.email);

    if (existingUser) throw new ConflictException('User already exists');

    const user = await this.authService.register(registerDto);
    return user;
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginControllerResponse> {
    const loginUser = await this.authService.login(loginDto);

    const { user, isMatch, token } = loginUser;

    const loginResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    res.cookie(TOKEN_NAME, token, { httpOnly: true });

    return {
      user: loginResponse,
      token,
    };
  }

  @UseGuards(AuthGuard)
  @Get('users')
  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.authService.findAll();
    return users;
  }
}
