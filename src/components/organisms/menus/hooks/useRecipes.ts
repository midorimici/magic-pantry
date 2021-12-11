import { useEffect, useState } from 'react'
import { useIngredients } from 'hooks'
import useSWR from 'swr'

const spoonacularAppKey = process.env.NEXT_PUBLIC_SPOONACULAR_APP_KEY
const baseURL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${spoonacularAppKey}&ranking=2&number=12`

const fetcher = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.message = (await res.json()).message
    throw error
  }

  return res.json()
}

export const useRecipes = () => {
  const [ingNames, setIngNames] = useState('')
  const { ingredients } = useIngredients()
  const { data, error } = useSWR<Recipe[], Error>(
    ingNames && `${baseURL}&ingredients=${ingNames}`,
    fetcher
  )

  useEffect(() => {
    const names = Object.values(ingredients)
      .map((ing: Ingredient) => ing.name)
      .join()
    setIngNames(names)
  }, [ingredients])

  return { recipes: data, error }
}
