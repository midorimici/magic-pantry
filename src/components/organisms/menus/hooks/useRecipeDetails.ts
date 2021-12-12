import { useState } from 'react'
import useSWR from 'swr'

const spoonacularAppKey = process.env.NEXT_PUBLIC_SPOONACULAR_APP_KEY
const reqURL = (id: number) =>
  `https://api.spoonacular.com/recipes/${id}/information?apiKey=${spoonacularAppKey}`

const fetcher = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.message = (await res.json()).message
    throw error
  }

  return res.json()
}

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
