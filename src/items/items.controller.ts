import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode } from '@nestjs/common'
import { Types } from 'mongoose'

import { ItemsService } from './items.service'
import { CreateItemDto } from './dto/create-item.dto'
import { UpdateItemDto } from './dto/update-item.dto'

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto)
  }

  @Get()
  findAll() {
    return this.itemsService.findAll()
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
  @HttpCode(204)
  remove(@Param('id') id: Types.ObjectId) {
    return this.itemsService.remove(id)
  }
}
