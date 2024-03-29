import { Injectable, NotImplementedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types, UpdateQuery } from 'mongoose'

import { MIN_NUMBER_OF_ITEMS_IN_RECIPE } from 'src/recipes/constants'
import { Recipe, RecipeDocument } from 'src/recipes/schemas/recipe.schema'

import { CreateItemDto } from './dto/create-item.dto'
import { UpdateItemDto } from './dto/update-item.dto'
import { Item, ItemDocument } from './schemas/item.schema'

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const createdItem = new this.itemModel(createItemDto)

    return await createdItem.save()
  }

  async findAll(filterParents: boolean, filterForeign: boolean, userId: string): Promise<Item[]> {
    const filter = {} as any

    if (filterParents) {
      filter.isParent = false
    }

    if (filterForeign) {
      filter.belongsTo = { $in: [null, userId] }
    }

    return await this.itemModel.find(filter).exec()
  }

  async findOne(id: Types.ObjectId): Promise<Item> {
    return await this.itemModel.findById(id).exec()
  }

  async update(id: Types.ObjectId, updateItemDto: UpdateItemDto): Promise<Item> {
    const updatedFields = updateItemDto as any

    return await this.itemModel
      .findByIdAndUpdate(id, updatedFields as UpdateQuery<ItemDocument>, { new: true })
      .exec()
  }

  async remove(
    id: Types.ObjectId
  ): Promise<{ removedItems: Types.ObjectId[]; removedRecipes: Types.ObjectId[] }> {
    const removedItem = await this.itemModel.findByIdAndDelete(id).exec()

    if (!removedItem) {
      throw new NotImplementedException()
    }

    const { parentItems, parentRecipe } = removedItem
    const removedItems = [removedItem.id]
    const removedRecipes = []

    if (parentRecipe) {
      await this.recipeModel.findByIdAndDelete(parentRecipe)
      removedRecipes.push(parentRecipe)
    }

    if (parentItems.length) {
      await this.itemModel.deleteMany({ _id: { $in: parentItems } })
      removedRecipes.push(...parentItems)
    }

    return { removedItems, removedRecipes }
  }

  async bag(id: Types.ObjectId, userId: string): Promise<Item> {
    const updatedFields = {
      belongsTo: userId,
      baggageDate: new Date().toISOString(),
    } as any
    const baggedItem = await this.itemModel
      .findByIdAndUpdate(id, updatedFields, { new: true })
      .exec()
    const baggedRecipes = await this.recipeModel.find({ belongsTo: userId, isParent: false }).exec()
    let craftedItem

    if (baggedRecipes.length) {
      const baggedItems = await this.itemModel
        .find({ belongsTo: userId, parentRecipe: { $exists: false }, isParent: false })
        .exec()

      if (baggedItems.length >= MIN_NUMBER_OF_ITEMS_IN_RECIPE) {
        for (const baggedRecipe of baggedRecipes) {
          if (!craftedItem) {
            const includedItemsIdList = [] as string[]

            baggedRecipe.itemTitles.forEach((itemTitle) => {
              const matchedItem = baggedItems.find(
                (item) => item.title.toLowerCase() === itemTitle.toLowerCase()
              )

              if (matchedItem) {
                includedItemsIdList.push(matchedItem._id)
              }
            })

            if (includedItemsIdList.length === baggedRecipe.itemTitles.length) {
              craftedItem = new this.itemModel({
                title: baggedRecipe.title,
                imageSrc: baggedRecipe.imageSrc,
                parentRecipe: baggedRecipe._id,
                parentItems: includedItemsIdList,
                belongsTo: userId,
                craftDate: new Date().toISOString(),
                baggageDate: new Date().toISOString(),
              })
              await craftedItem.save()

              await this.recipeModel.findByIdAndUpdate(
                baggedRecipe._id,
                { isParent: true } as any,
                { new: true }
              )
              await this.itemModel.updateMany(
                { _id: { $in: includedItemsIdList } },
                { isParent: true },
                { new: true }
              )
            }
          }
        }
      }
    }

    return craftedItem || baggedItem
  }

  async unbag(id: Types.ObjectId): Promise<Item> {
    const updatedFields = {
      belongsTo: null,
      baggageDate: null,
    } as UpdateQuery<ItemDocument>

    return await this.itemModel
      .findByIdAndUpdate(id, updatedFields, {
        new: true,
      })
      .exec()
  }
}
