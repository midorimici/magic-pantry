import { useState } from 'react'
import useSWR from 'swr'

const edamamAppId = process.env.NEXT_PUBLIC_EDAMAM_APP_ID
const edamamAppKey = process.env.NEXT_PUBLIC_EDAMAM_APP_KEY

export const useAutoSuggestion = () => {
  const [ingredient, setIngredient] = useState('')
  const { data, error } = useSWR<string[]>(
    `https://api.edamam.com/auto-complete?app_id=${edamamAppId}&app_key=${edamamAppKey}&q=${ingredient}`,
    (url: string) => fetch(url).then((res: Response) => res.json())
  )

  const handleIngredientChange = (ing: string) => {
    setTimeout(() => setIngredient(ing), 300)
  }

  return { suggestions: data, error, handleIngredientChange }
}
