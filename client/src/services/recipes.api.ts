import { apiClient } from '@/utils/api'
import { Recipe, RecipeForm } from '@/types/recipe.types'
import { RecipeDeleteResponse } from '@/types/response.types'

export const recipesService = {
  async getRecipes(isFiltered = true): Promise<Recipe[]> {
    const { data: recipes } = await apiClient.get(`/recipes?filterParents=${isFiltered}`)

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

  async deleteRecipe(recipeId: Recipe['_id']): Promise<RecipeDeleteResponse> {
    const { data } = await apiClient.delete(`/recipes/${recipeId}`)

    return data
  },

  async bag(recipeId: Recipe['_id']): Promise<Recipe> {
    const { data: recipe } = await apiClient.get(`/recipes/bag/${recipeId}`)

    return recipe
  },

  async unbag(recipeId: Recipe['_id']): Promise<Recipe> {
    const { data: recipe } = await apiClient.get(`/recipes/unbag/${recipeId}`)

    return recipe
  },
}
