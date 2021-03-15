import { Controller, Post, Request, UseGuards } from '@nestjs/common'

import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'
import { LoginResponse } from './types'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<LoginResponse> {
    return this.authService.login(req.user)
  }
}
