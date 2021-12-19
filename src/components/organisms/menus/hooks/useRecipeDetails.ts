import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { getCache, setCache } from 'lib/cacheHandlers'
import { fetcher } from 'lib/fetcher'

const spoonacularAppKey = process.env.NEXT_PUBLIC_SPOONACULAR_APP_KEY
const reqURL = (id: number) =>
  `https://api.spoonacular.com/recipes/${id}/information?apiKey=${spoonacularAppKey}`

const storageKey = (id: number) => `magic-pantry/recipes/${id}`

export const useRecipeDetails = () => {
  const [recipeId, setRecipeId] = useState<number | null>(null)
  const [recipeInfo, setRecipeInfo] = useState<RecipeDetail | null>(null)
  const [shouldFetch, setShouldFetch] = useState(false)
  const { error } = useSWR<RecipeDetail, Error>(
    shouldFetch && recipeId !== null && reqURL(recipeId),
    fetcher,
    {
      onError: () => {
        if (recipeId !== null) {
          localStorage.removeItem(storageKey(recipeId))
        }
      },
      onSuccess: (data: RecipeDetail) => {
        if (recipeId !== null) {
          setCache(storageKey(recipeId), data)
          setShouldFetch(false)
          setRecipeInfo(data)
        }
      },
    }
  )

  useEffect(() => {
    if (recipeId !== null) {
      getCache(
        storageKey(recipeId),
        (data: RecipeDetail) => {
          setShouldFetch(false)
          setRecipeInfo(data)
        },
        () => setShouldFetch(true)
      )
    }
  }, [recipeId])

  const handleRecipeClick = (id: number) => {
    setRecipeId(id)
  }

  const resetRecipe = () => {
    setRecipeId(null)
    setRecipeInfo(null)
  }

  return { recipeInfo, recipeDetailError: error, resetRecipe, handleRecipeClick }
}
