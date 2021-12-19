import { useState } from 'react'
import useSWR from 'swr'
import { fetcher } from 'lib/fetcher'

const spoonacularAppKey = process.env.NEXT_PUBLIC_SPOONACULAR_APP_KEY
const reqURL = (id: number) =>
  `https://api.spoonacular.com/recipes/${id}/information?apiKey=${spoonacularAppKey}`

export const useRecipeDetails = () => {
  const [recipeId, setRecipeId] = useState<number | null>(null)
  const { data, error } = useSWR<RecipeDetail, Error>(
    recipeId !== null && reqURL(recipeId),
    fetcher
  )

  const handleRecipeClick = (id: number) => {
    setRecipeId(id)
  }

  const resetRecipe = () => {
    setRecipeId(null)
  }

  return { recipeInfo: data, recipeDetailError: error, resetRecipe, handleRecipeClick }
}
