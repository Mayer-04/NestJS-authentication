import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { LoginDto, RegisterDto } from './dtos';
import { UserEntity } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from './interfaces/login-response';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }
  async register(registerDto: RegisterDto): Promise<UserEntity> {
    const { name, email, password } = registerDto;

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const newUser = {
      name,
      email,
      password: hash,
    };

    const user = await this.userModel.create(newUser);
    return user;
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;

    const findByEmail = await this.findByEmail(email);

    const isMatch = await bcrypt.compare(password, findByEmail.password);

    const payload = {
      name: findByEmail.name,
      email: findByEmail.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return { user: findByEmail, token, isMatch };
  }
}
