import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }
  async register(registerDto: RegisterDto): Promise<UserEntity> {
    const { name, email, password } = registerDto;

    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    const newUser = {
      name,
      email,
      password: hashPassword,
    };

    const user = await this.userModel.create(newUser);
    return user;
  }

  async login(loginDto: LoginDto): Promise<LoginResponse | null> {
    const { email, password } = loginDto;

    const user = await this.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    const payload = {
      name: user.name,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return { user, token, isMatch };
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userModel.find().exec();
    return users;
  }
}
