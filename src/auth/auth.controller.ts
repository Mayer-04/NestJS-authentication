import {
  Body,
  ConflictException,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dtos';
import { UserEntity } from './entities/user.entity';
import { Response } from 'express';

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
  ): Promise<{ user: UserEntity; token: string }> {
    const loginUser = await this.authService.login(loginDto);

    const { user, isMatch, token } = loginUser;

    if (!user) throw new UnauthorizedException('Invalid credentials');

    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    res.cookie('jwt', token, { httpOnly: true });

    return {
      user,
      token,
    };
  }
}
