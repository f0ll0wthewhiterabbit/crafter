export interface Recipe {
  _id: string
  title: string
  imageSrc: string
  itemTitles: string[]
  belongsTo: string | null
  baggageDate: number | null
  isParent: boolean
}

export type RecipeForm = Pick<Recipe, 'title' | 'imageSrc' | 'itemTitles'>
