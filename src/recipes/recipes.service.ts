import { Injectable, NotImplementedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types, UpdateQuery } from 'mongoose'

import { Item, ItemDocument } from 'src/items/schemas/item.schema'

import { Recipe, RecipeDocument } from './schemas/recipe.schema'
import { CreateRecipeDto, MIN_NUMBER_OF_ITEMS_IN_RECIPE } from './dto/create-recipe.dto'
import { UpdateRecipeDto } from './dto/update-recipe.dto'

export const DUMMY_USER_ID = '333b8775230f77072cb77333' // FIXME: this is a temporary solution

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>
  ) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const createdCat = new this.recipeModel(createRecipeDto)

    return await createdCat.save()
  }

  async findAll(filterParents: boolean): Promise<Recipe[]> {
    const filter = filterParents ? { isParent: false } : {}

    return await this.recipeModel.find(filter).exec()
  }

  async findOne(id: Types.ObjectId): Promise<Recipe> {
    return await this.recipeModel.findById(id).exec()
  }

  async update(id: Types.ObjectId, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    const updatedFields = updateRecipeDto as any

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

  async bag(id: Types.ObjectId): Promise<Recipe> {
    // TODO: fix DUMMY_USER_ID using real userId
    const updatedFields = {
      belongsTo: DUMMY_USER_ID,
      baggageDate: new Date().toISOString(),
    } as any

    const baggedItems = await this.itemModel
      .find({
        belongsTo: DUMMY_USER_ID,
        parentRecipe: { $exists: false },
        isParent: false,
      })
      .exec()
    const recipe = await this.recipeModel.findById(id).exec()
    const includedItemsIdList = [] as string[]

    if (!recipe.isParent && baggedItems.length >= MIN_NUMBER_OF_ITEMS_IN_RECIPE) {
      recipe.itemTitles.forEach((itemTitle) => {
        const matchedItem = baggedItems.find(
          (item) => item.title.toLowerCase() === itemTitle.toLowerCase()
        )

        if (matchedItem) {
          includedItemsIdList.push(matchedItem._id)
        }
      })

      if (includedItemsIdList.length === recipe.itemTitles.length) {
        const craftedItem = new this.itemModel({
          title: recipe.title,
          imageSrc: recipe.imageSrc,
          parentRecipe: recipe._id,
          parentItems: includedItemsIdList,
          belongsTo: DUMMY_USER_ID,
          craftDate: new Date().toISOString(),
          baggageDate: new Date().toISOString(),
        })

        await craftedItem.save()
        await this.itemModel.updateMany(
          { _id: { $in: includedItemsIdList } },
          { isParent: true },
          {
            new: true,
            useFindAndModify: false,
          }
        )
        updatedFields.isParent = true
      }
    }

    return await this.recipeModel
      .findByIdAndUpdate(id, updatedFields, {
        new: true,
        useFindAndModify: false,
      })
      .exec()
  }

  async unbag(id: Types.ObjectId): Promise<Recipe> {
    const updatedFields = {
      belongsTo: null,
      baggageDate: null,
    } as UpdateQuery<RecipeDocument>

    return await this.recipeModel
      .findByIdAndUpdate(id, updatedFields, {
        new: true,
        useFindAndModify: false,
      })
      .exec()
  }
}
