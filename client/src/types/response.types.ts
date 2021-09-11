import { Item } from '@/types/item.types'
import { Recipe } from '@/types/recipe.types'

export interface MongoDBResponse {
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ItemDeleteResponse {
  removedItems: Item['id'][]
  removedRecipes: Recipe['id'][]
}

export interface RecipeDeleteResponse {
  removedRecipes: Recipe['id'][]
}

export interface SignInResponse {
  accessToken: string
}
