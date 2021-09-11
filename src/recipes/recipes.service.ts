import { Injectable, NotImplementedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, IsNull, Repository } from 'typeorm'

import { CreateRecipeDto } from './dto/create-recipe.dto'
import { UpdateRecipeDto } from './dto/update-recipe.dto'
import { MIN_NUMBER_OF_ITEMS_IN_RECIPE } from './constants'
import { Recipe } from './entities/recipe.entity'
import { Item } from 'src/items/entities/item.entity'

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe) private recipesRepository: Repository<Recipe>,
    @InjectRepository(Item) private itemsRepository: Repository<Item>
  ) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const recipe = await this.recipesRepository.create(createRecipeDto)

    return await this.recipesRepository.save(recipe)
  }

  async findAll(filterParents: boolean, filterForeign: boolean, userId: string): Promise<Recipe[]> {
    let filter = {} as any

    if (filterParents && filterForeign) {
      filter = [
        { belongsTo: null, isParent: false },
        { belongsTo: userId, isParent: false },
      ]
    } else if (filterParents) {
      filter = { isParent: false }
    } else if (filterForeign) {
      filter = [{ belongsTo: null }, { belongsTo: userId }]
    }

    return await this.recipesRepository.find({ where: filter })
  }

  async findOne(id: string): Promise<Recipe> {
    return await this.recipesRepository.findOne(id)
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    const recipe = await this.recipesRepository.findOne(id)

    return await this.recipesRepository.save({ ...recipe, ...updateRecipeDto })
  }

  async remove(id: string): Promise<{ removedRecipes: string[] }> {
    const { affected } = await this.recipesRepository.delete(id)

    if (!affected) {
      throw new NotImplementedException()
    }

    return { removedRecipes: [id] }
  }

  async bag(id: string, userId: string): Promise<Recipe> {
    const baggedItems = await this.itemsRepository.find({
      where: {
        belongsTo: userId,
        parentRecipe: IsNull(),
        isParent: false,
      },
    })

    const recipe = await this.recipesRepository.findOne(id)
    const includedItemsIdList = [] as string[]

    if (!recipe.isParent && baggedItems.length >= MIN_NUMBER_OF_ITEMS_IN_RECIPE) {
      recipe.itemTitles.forEach((itemTitle) => {
        const matchedItem = baggedItems.find(
          (item) => item.title.toLowerCase() === itemTitle.toLowerCase()
        )

        if (matchedItem) {
          includedItemsIdList.push(matchedItem.id)
        }
      })

      if (includedItemsIdList.length === recipe.itemTitles.length) {
        await this.itemsRepository.insert({
          title: recipe.title,
          imageSrc: recipe.imageSrc,
          parentRecipe: recipe.id,
          parentItems: includedItemsIdList,
          belongsTo: userId,
          craftDate: new Date().toISOString(),
          baggageDate: new Date().toISOString(),
        })

        await this.itemsRepository.update({ id: In(includedItemsIdList) }, { isParent: true })
        recipe.isParent = true
      }
    }

    recipe.belongsTo = userId
    recipe.baggageDate = new Date()

    return await this.recipesRepository.save(recipe)
  }

  async unbag(id: string): Promise<Recipe> {
    const recipe = await this.recipesRepository.findOne(id)
    recipe.belongsTo = null
    recipe.baggageDate = null

    return await this.recipesRepository.save(recipe)
  }
}
