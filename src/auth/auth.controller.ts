import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos';
import { UserEntity } from './entities/user.entity';

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
  async login() {
    return 'Login';
  }
}
