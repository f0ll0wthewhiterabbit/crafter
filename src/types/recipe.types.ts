import { Item } from '@/types/item.types'

export interface Recipe {
  id: string
  title: string
  imageSrc: string
  items: Item['id'][]
  belongsTo: string | null
  baggageDate: number | null
}

export type RecipeForm = Pick<Recipe, 'title' | 'imageSrc' | 'items'>
