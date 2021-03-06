import { apiClient } from '@/utils/api'
import { Recipe, RecipeForm } from '@/types/recipe.types'

export const recipesService = {
  async getRecipes(): Promise<Recipe[]> {
    const { data: recipes } = await apiClient.get('/recipes')

    return recipes
  },

  async addRecipe(recipeValues: RecipeForm): Promise<Recipe> {
    const { data: recipe } = await apiClient.post('/recipes', recipeValues)

    return recipe
  },

  async editRecipe(recipeId: Recipe['_id'], recipeValues: Partial<Recipe>): Promise<Recipe> {
    const { data: recipe } = await apiClient.put(`/recipes/${recipeId}`, recipeValues)

    return recipe
  },

  async deleteRecipe(recipeId: Recipe['_id']): Promise<void> {
    await apiClient.delete(`/recipes/${recipeId}`)
  },
}
