import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types, UpdateQuery } from 'mongoose'

import { Item, ItemDocument } from 'src/items/schemas/item.schema'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { UpdateRecipeDto } from './dto/update-recipe.dto'
import { Recipe, RecipeDocument } from './schemas/recipe.schema'

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>
  ) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const isItemAbsent = await this.isItemAbsent(createRecipeDto.items)

    if (isItemAbsent) {
      throw new NotFoundException("Item doesn't exist")
    }

    const createdCat = new this.recipeModel(createRecipeDto)
    return await createdCat.save()
  }

  async findAll(): Promise<Recipe[]> {
    return await this.recipeModel.find().exec()
  }

  async findOne(id: Types.ObjectId): Promise<Recipe> {
    return await this.recipeModel.findById(id).exec()
  }

  async update(id: Types.ObjectId, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    if (updateRecipeDto.items) {
      const isItemAbsent = await this.isItemAbsent(updateRecipeDto.items)

      if (isItemAbsent) {
        throw new NotFoundException("Item doesn't exist")
      }
    }

    const updatedFields = updateRecipeDto as any

    if (updateRecipeDto.belongsTo || updateRecipeDto.belongsTo === null) {
      const { belongsTo } = await this.recipeModel.findById(id).exec()

      if (belongsTo !== updateRecipeDto.belongsTo) {
        // TODO: check current user id (belongsTo)
        updatedFields.baggageDate = updateRecipeDto.belongsTo ? new Date().toISOString() : null
      }
    }

    return await this.recipeModel
      .findByIdAndUpdate(id, updatedFields as UpdateQuery<RecipeDocument>, {
        new: true,
        useFindAndModify: false,
      })
      .exec()
  }

  async remove(id: Types.ObjectId): Promise<{ removedRecipes: Types.ObjectId[] }> {
    const removedRecipe = await this.recipeModel.findByIdAndDelete(id).exec()

    if (!removedRecipe) {
      throw new NotImplementedException()
    }

    return { removedRecipes: [removedRecipe.id] }
  }

  private async isItemAbsent(items: Types.ObjectId[]): Promise<boolean> {
    for (const itemId of items) {
      const item = await this.itemModel.findById(itemId).limit(1)

      if (item === null) {
        return true
      }
    }

    return false
  }
}
