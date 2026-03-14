import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../common/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity | null> {
    const user = await this.usersService.findByEmail(email);

    if (user && user.password === password) {
      const { password, ...rest } = user;
      return rest as UserEntity;
    }
    return null;
  }

  login(user: UserEntity): { accessToken: string } {
    const payload = { email: user.email, id: user.id };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
