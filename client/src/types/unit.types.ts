import { Item } from '@/types/item.types'
import { Recipe } from '@/types/recipe.types'
import { UNIT_TYPES } from '@/constants/unit.constants'

export type Unit = Item | Recipe

export type TypedUnit = Unit & {
  type: UNIT_TYPES
}
