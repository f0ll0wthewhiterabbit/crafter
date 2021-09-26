import { Injectable, NotImplementedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types, UpdateQuery } from 'mongoose'

import { Item, ItemDocument } from 'src/items/schemas/item.schema'

import { Recipe, RecipeDocument } from './schemas/recipe.schema'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { UpdateRecipeDto } from './dto/update-recipe.dto'
import { MIN_NUMBER_OF_ITEMS_IN_RECIPE } from './constants'
import { RecipesGateway } from './recipes.gateway'

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    private recipesGateway: RecipesGateway
  ) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const createdRecipe = new this.recipeModel(createRecipeDto)
    const recipe = await createdRecipe.save()
    this.recipesGateway.handleRecipeAppear(recipe)

    return recipe
  }

  async findAll(filterParents: boolean, filterForeign: boolean, userId: string): Promise<Recipe[]> {
    const filter = {} as any

    if (filterParents) {
      filter.isParent = false
    }

    if (filterForeign) {
      filter.belongsTo = { $in: [null, userId] }
    }

    return await this.recipeModel.find(filter).exec()
  }

  async findOne(id: Types.ObjectId): Promise<Recipe> {
    return await this.recipeModel.findById(id).exec()
  }

  async update(id: Types.ObjectId, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    const updatedFields = updateRecipeDto as any
    const recipe = await this.recipeModel
      .findByIdAndUpdate(id, updatedFields as UpdateQuery<RecipeDocument>, { new: true })
      .exec()
    this.recipesGateway.handleRecipeUpdate(recipe)

    return recipe
  }

  async remove(id: Types.ObjectId): Promise<{ removedRecipes: Types.ObjectId[] }> {
    const removedRecipe = await this.recipeModel.findByIdAndDelete(id).exec()

    if (!removedRecipe) {
      throw new NotImplementedException()
    }

    const removedRecipes = [removedRecipe.id]
    this.recipesGateway.handleRecipesRemove(removedRecipes)

    return { removedRecipes }
  }

  async bag(id: Types.ObjectId, userId: string): Promise<Recipe> {
    const updatedFields = {
      belongsTo: userId,
      baggageDate: new Date().toISOString(),
    } as any

    const baggedItems = await this.itemModel
      .find({
        belongsTo: userId,
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
          belongsTo: userId,
          craftDate: new Date().toISOString(),
          baggageDate: new Date().toISOString(),
        })

        await craftedItem.save()
        await this.itemModel.updateMany(
          { _id: { $in: includedItemsIdList } },
          { isParent: true },
          { new: true }
        )
        updatedFields.isParent = true
      }
    }

    const updatedRecipe = await this.recipeModel
      .findByIdAndUpdate(id, updatedFields, { new: true })
      .exec()
    this.recipesGateway.handleRecipeBag(updatedRecipe)

    return updatedRecipe
  }

  async unbag(id: Types.ObjectId): Promise<Recipe> {
    const updatedFields = {
      belongsTo: null,
      baggageDate: null,
    } as UpdateQuery<RecipeDocument>
    const recipe = await this.recipeModel.findByIdAndUpdate(id, updatedFields, { new: true }).exec()
    this.recipesGateway.handleRecipeAppear(recipe)

    return recipe
  }
}
