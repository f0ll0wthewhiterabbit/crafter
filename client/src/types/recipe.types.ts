import { MongoDBResponse } from '@/types/response.types'

export interface Recipe extends MongoDBResponse {
  _id: string
  title: string
  imageSrc: string
  itemTitles: string[]
  belongsTo: string | null
  baggageDate: number | null
  isParent: boolean
}

export interface RecipeForm {
  title: string
  imageSrc: string
  itemTitles: string[]
}
