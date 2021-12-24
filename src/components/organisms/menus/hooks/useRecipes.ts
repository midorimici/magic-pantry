import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useIngredients } from 'hooks'
import { clearCache, getCache, setCache } from 'lib/cacheHandlers'
import { fetcher } from 'lib/fetcher'

const spoonacularAppKey = process.env.NEXT_PUBLIC_SPOONACULAR_APP_KEY
const baseURL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${spoonacularAppKey}&ranking=2&number=12`

const storageKey = (ingNames: string) => `magic-pantry/findByIngredients/${ingNames}`

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null)
  const [ingNames, setIngNames] = useState('')
  const [noIngredient, setNoIngredient] = useState(false)
  const [initLoadCompleted, setInitLoadCompleted] = useState(false)
  const [shouldFetch, setShouldFetch] = useState(false)
  const { ingredients } = useIngredients()
  const { error } = useSWR<Recipe[], Error>(
    shouldFetch && ingNames && `${baseURL}&ingredients=${ingNames}`,
    fetcher,
    {
      onError: () => {
        localStorage.removeItem(storageKey(ingNames))
      },
      onSuccess: (data: Recipe[]) => {
        setCache(storageKey(ingNames), data)
        setShouldFetch(false)
        setRecipes(data)
      },
    }
  )

  useEffect(() => {
    clearCache()
  }, [])

  useEffect(() => {
    let isSubscribed = true

    if (initLoadCompleted && Object.keys(ingredients).length === 0) {
      setNoIngredient(true)
    } else {
      const names = Object.values(ingredients)
        .map((ing: Ingredient) => ing.name)
        .join()

      if (isSubscribed) {
        getCache(
          storageKey(names),
          (data: Recipe[]) => {
            setShouldFetch(false)
            setRecipes(data)
          },
          () => {
            setShouldFetch(true)
            setIngNames(names)
          }
        )
      }
    }
    setInitLoadCompleted(true)

    return () => {
      isSubscribed = false
    }
  }, [ingredients])

  return { recipes, error, noIngredient }
}
