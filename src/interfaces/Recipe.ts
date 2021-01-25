import { Item } from '@/interfaces/Item'

export interface Recipe {
  id: string
  title: string
  imageSrc: string
  items: Item['id'][]
}
