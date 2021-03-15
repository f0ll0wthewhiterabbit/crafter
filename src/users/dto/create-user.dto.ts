import { IsEmail, IsString, MinLength } from 'class-validator'

import { MIN_PASSWORD_LENGTH } from '../constants'

export class CreateUserDto {
  @IsEmail()
  readonly email: string

  @IsString()
  @MinLength(MIN_PASSWORD_LENGTH)
  readonly password: string
}
