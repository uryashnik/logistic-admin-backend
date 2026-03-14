import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decoretor';
import { AuthRequest } from '../common/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @Post('/profile')
  profile(@Request() req: AuthRequest) {
    const { password, ...result } = req.user;
    return result;
  }
}
