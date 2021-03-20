import { Item } from '@/types/item.types'
import { Recipe } from '@/types/recipe.types'

export interface MongoDBResponse {
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ItemDeleteResponse {
  removedItems: Item['_id'][]
  removedRecipes: Recipe['_id'][]
}

export interface RecipeDeleteResponse {
  removedRecipes: Recipe['_id'][]
}

export interface SignInResponse {
  accessToken: string
}
