import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseBoolPipe,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common'
import { Types } from 'mongoose'

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { RequestWithUser } from 'src/auth/types'

import { ItemsService } from './items.service'
import { CreateItemDto } from './dto/create-item.dto'
import { UpdateItemDto } from './dto/update-item.dto'

@UseGuards(JwtAuthGuard)
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto)
  }

  @Get()
  findAll(
    @Query('filterParents', ParseBoolPipe) filterParents: boolean,
    @Query('filterForeign', ParseBoolPipe) filterForeign: boolean,
    @Req() request: RequestWithUser
  ) {
    const { userId } = request.user

    return this.itemsService.findAll(filterParents, filterForeign, userId)
  }

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId) {
    return this.itemsService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: Types.ObjectId, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(id, updateItemDto)
  }

  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.itemsService.remove(id)
  }

  @Get('bag/:id')
  bag(@Param('id') id: Types.ObjectId, @Req() request: RequestWithUser) {
    const { userId } = request.user

    return this.itemsService.bag(id, userId)
  }

  @Get('unbag/:id')
  unbag(@Param('id') id: Types.ObjectId) {
    return this.itemsService.unbag(id)
  }
}
