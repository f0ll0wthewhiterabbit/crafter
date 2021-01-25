import { Recipe } from '@/interfaces/Recipe'

export type RecipeForm = Pick<Recipe, 'title' | 'imageSrc' | 'items'>
