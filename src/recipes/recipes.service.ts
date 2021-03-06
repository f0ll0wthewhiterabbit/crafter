import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types, UpdateQuery } from 'mongoose'

import { Item, ItemDocument } from 'src/items/schemas/item.schema'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { UpdateRecipeDto } from './dto/update-recipe.dto'
import { Recipe, RecipeDocument } from './schemas/recipe.schema'

export const DUMMY_USER_ID = '333b8775230f77072cb77333' // FIXME: this is a temporary solution

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>
  ) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    await this.checkItemsExistence(createRecipeDto.items)
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
      await this.checkItemsExistence(updateRecipeDto.items)
    }

    const updatedFields = updateRecipeDto as any

    if (updateRecipeDto.belongsTo || updateRecipeDto.belongsTo === null) {
      const { belongsTo } = await this.recipeModel.findById(id).exec()

      if (belongsTo !== updateRecipeDto.belongsTo) {
        // TODO: fix using real userId
        if (updateRecipeDto.belongsTo !== null && updateRecipeDto.belongsTo !== DUMMY_USER_ID) {
          throw new ForbiddenException()
        }

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

  private async checkItemsExistence(items: string[]): Promise<void> {
    for (const itemTitle of items) {
      const item = await this.itemModel
        .findOne({
          title: new RegExp(`^${itemTitle}$`, 'i'),
          belongsTo: { $in: [null, DUMMY_USER_ID] }, // TODO: fix using real userId
        })
        .exec()

      if (item === null) {
        throw new NotFoundException("Item doesn't exist")
      }
    }
  }
}
