import { Injectable, NotImplementedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types, UpdateQuery } from 'mongoose'

import { CreateItemDto } from './dto/create-item.dto'
import { UpdateItemDto } from './dto/update-item.dto'
import { Item, ItemDocument } from './schemas/item.schema'

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const createdCat = new this.itemModel(createItemDto)
    return await createdCat.save()
  }

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find().exec()
  }

  async findOne(id: Types.ObjectId): Promise<Item> {
    return await this.itemModel.findById(id).exec()
  }

  async update(id: Types.ObjectId, updateItemDto: UpdateItemDto): Promise<Item> {
    const updatedFields = updateItemDto as never
    return await this.itemModel
      .findByIdAndUpdate(id, updatedFields as UpdateQuery<ItemDocument>, {
        new: true,
        useFindAndModify: false,
      })
      .exec()
  }

  async remove(id: Types.ObjectId): Promise<{ removedItems: Types.ObjectId[] }> {
    const removedItem = await this.itemModel.findByIdAndDelete(id).exec()

    if (!removedItem) {
      throw new NotImplementedException()
    }

    return { removedItems: [removedItem.id] }
  }
}
