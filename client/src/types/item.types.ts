export interface Item {
  _id: string
  title: string
  imageSrc: string
  belongsTo: string | null
  baggageDate: number | null
}

export type ItemForm = Pick<Item, 'title' | 'imageSrc'>
