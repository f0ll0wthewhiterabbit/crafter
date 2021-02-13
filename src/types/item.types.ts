export interface Item {
  id: string
  title: string
  imageSrc: string
  belongsTo: string | null
  baggageDate: number | null
}

export type ItemForm = Pick<Item, 'title' | 'imageSrc'>
