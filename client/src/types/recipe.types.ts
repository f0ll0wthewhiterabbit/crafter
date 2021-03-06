import { Item } from '@/types/item.types'

export interface Recipe {
  _id: string
  title: string
  imageSrc: string
  items: Item['title'][]
  belongsTo: string | null
  baggageDate: number | null
}

export type RecipeForm = Pick<Recipe, 'title' | 'imageSrc' | 'items'>
