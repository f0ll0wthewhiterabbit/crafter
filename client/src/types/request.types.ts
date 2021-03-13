import { Item } from '@/types/item.types'
import { Recipe } from '@/types/recipe.types'

export interface Request {
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ItemRequest extends Item, Request {}

export interface RecipeRequest extends Recipe, Request {}

export interface ItemDeleteRequest {
  removedItems: Item['_id'][]
  removedRecipes: Recipe['_id'][]
}

export interface RecipeDeleteRequest {
  removedRecipes: Recipe['_id'][]
}
