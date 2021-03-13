export interface Item {
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

export type ItemForm = Pick<Item, 'title' | 'imageSrc'>
