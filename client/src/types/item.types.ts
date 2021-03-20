import { MongoDBResponse } from '@/types/response.types'

export interface Item extends MongoDBResponse {
  _id: string
  title: string
  imageSrc: string
  belongsTo: string | null
  baggageDate: number | null
  craftDate: number | null
  isParent: boolean
  parentRecipe?: string
  parentItems?: string[]
}

export interface ItemForm {
  title: string
  imageSrc: string
}
