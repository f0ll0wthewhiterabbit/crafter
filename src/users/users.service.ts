import { Injectable, NotAcceptableException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const { email, password: initialPassword } = createUserDto
    const existingUser = await this.usersRepository.findOne({ email })

    if (existingUser) {
      throw new NotAcceptableException('User already exists')
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(initialPassword, saltRounds)

    const createdUser = { ...createUserDto, password: hashedPassword }
    await this.usersRepository.insert(createdUser)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = createdUser

    return result
  }

  async findOne(email: string): Promise<User> {
    return await this.usersRepository.findOne({ email })
  }
}
