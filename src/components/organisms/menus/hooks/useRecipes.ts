import { useEffect, useState } from 'react'
import { useIngredients } from 'hooks'
import useSWR from 'swr'

const spoonacularAppKey = process.env.NEXT_PUBLIC_SPOONACULAR_APP_KEY
const baseURL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${spoonacularAppKey}&ranking=2&number=12`

export const useRecipes = () => {
  const [ingNames, setIngNames] = useState('')
  const { ingredients } = useIngredients()
  const { data, error } = useSWR<Recipe[], Response>(
    ingNames && `${baseURL}&ingredients=${ingNames}`,
    (url: string) => fetch(url).then((res: Response) => res.json())
  )

  useEffect(() => {
    const names = Object.values(ingredients)
      .map((ing: Ingredient) => ing.name)
      .join()
    setIngNames(names)
  }, [ingredients])

  return { recipes: data, error }
}
