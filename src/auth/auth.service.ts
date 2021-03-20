import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { UsersService } from 'src/users/users.service'

import { LoginResponse } from './types'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email)
    const { password: hashedPassword } = user
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword)

    if (user && isPasswordMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = JSON.parse(JSON.stringify(user))

      return result
    }

    return null
  }

  async login(user: any): Promise<LoginResponse> {
    const payload = { email: user.email, sub: user._id }

    return {
      accessToken: this.jwtService.sign(payload),
    }
  }
}
