import { Injectable, NotAcceptableException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { CreateUserDto } from './dto/create-user.dto'
import { User, UserDocument } from './schemas/user.schema'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const { email, password: initialPassword } = createUserDto
    const existingUser = await this.userModel.findOne({ email })

    if (existingUser) {
      throw new NotAcceptableException('User already exists')
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(initialPassword, saltRounds)

    const createdUser = new this.userModel({ ...createUserDto, password: hashedPassword })
    await createdUser.save()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = JSON.parse(JSON.stringify(createdUser))

    return result
  }

  async findOne(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec()
  }
}
