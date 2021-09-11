import { Injectable, NotImplementedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, IsNull, Repository } from 'typeorm'

import { MIN_NUMBER_OF_ITEMS_IN_RECIPE } from 'src/recipes/constants'

import { CreateItemDto } from './dto/create-item.dto'
import { UpdateItemDto } from './dto/update-item.dto'
import { Item } from './entities/item.entity'
import { Recipe } from 'src/recipes/entities/recipe.entity'

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemsRepository: Repository<Item>,
    @InjectRepository(Recipe) private recipesRepository: Repository<Recipe>
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const item = await this.itemsRepository.create(createItemDto)

    return await this.itemsRepository.save(item)
  }

  async findAll(filterParents: boolean, filterForeign: boolean, userId: string): Promise<Item[]> {
    let filter = {} as any

    if (filterParents && filterForeign) {
      filter = [
        { belongsTo: IsNull(), isParent: false },
        { belongsTo: userId, isParent: false },
      ]
    } else if (filterParents) {
      filter = { isParent: false }
    } else if (filterForeign) {
      filter = [{ belongsTo: IsNull() }, { belongsTo: userId }]
    }

    return await this.itemsRepository.find({ where: filter })
  }

  async findOne(id: string): Promise<Item> {
    return await this.itemsRepository.findOne(id)
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.itemsRepository.findOne(id)

    return await this.itemsRepository.save({ ...item, ...updateItemDto })
  }

  async remove(id: string): Promise<{ removedItems: string[]; removedRecipes: string[] }> {
    const { parentItems, parentRecipe } = await this.itemsRepository.findOne(id)
    const { affected } = await this.itemsRepository.delete(id)

    if (!affected) {
      throw new NotImplementedException()
    }

    const removedItems = [id]
    const removedRecipes = []

    if (parentRecipe) {
      await this.recipesRepository.delete(parentRecipe)
      removedRecipes.push(parentRecipe)
    }

    if (parentItems.length) {
      await this.itemsRepository.delete(parentItems)
      removedRecipes.push(...parentItems)
    }

    return { removedItems, removedRecipes }
  }

  async bag(id: string, userId: string): Promise<Item> {
    const baggedItem = await this.itemsRepository.findOne(id)
    baggedItem.belongsTo = userId
    baggedItem.baggageDate = new Date()
    await this.itemsRepository.save(baggedItem)
    const baggedRecipes = await this.recipesRepository.find({ belongsTo: userId, isParent: false })
    let craftedItem: Item

    if (baggedRecipes.length) {
      const baggedItems = await this.itemsRepository.find({
        where: {
          belongsTo: userId,
          parentRecipe: IsNull(),
          isParent: false,
        },
      })

      if (baggedItems.length >= MIN_NUMBER_OF_ITEMS_IN_RECIPE) {
        for (const baggedRecipe of baggedRecipes) {
          if (!craftedItem) {
            const includedItemsIdList = [] as string[]

            baggedRecipe.itemTitles.forEach((itemTitle) => {
              const matchedItem = baggedItems.find(
                (item) => item.title.toLowerCase() === itemTitle.toLowerCase()
              )

              if (matchedItem) {
                includedItemsIdList.push(matchedItem.id)
              }
            })

            if (includedItemsIdList.length === baggedRecipe.itemTitles.length) {
              await this.itemsRepository.insert({
                title: baggedRecipe.title,
                imageSrc: baggedRecipe.imageSrc,
                parentRecipe: baggedRecipe.id,
                parentItems: includedItemsIdList,
                belongsTo: userId,
                craftDate: new Date().toISOString(),
                baggageDate: new Date().toISOString(),
              })

              await this.recipesRepository.update(baggedRecipe.id, { isParent: true })
              await this.itemsRepository.update({ id: In(includedItemsIdList) }, { isParent: true })
            }
          }
        }
      }
    }

    return craftedItem || baggedItem
  }

  async unbag(id: string): Promise<Item> {
    const item = await this.itemsRepository.findOne(id)
    item.belongsTo = null
    item.baggageDate = null

    return await this.itemsRepository.save(item)
  }
}
