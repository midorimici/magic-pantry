import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { get, ref, DataSnapshot } from '@firebase/database'
import { useDatabasePaths } from 'hooks'
import { db } from 'lib/firebase'
import { loadingHandler } from 'lib/loadingHandler'
import { ingredientsState } from 'states/pantry/atom'

export const useIngredients = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [ingredients, setIngredients] = useRecoilState(ingredientsState)
  const { pantryPath } = useDatabasePaths()

  useEffect(() => {
    if (pantryPath) {
      loadingHandler(setIsLoading, async () => {
        await get(ref(db, pantryPath))
          .then((snapshot: DataSnapshot) => {
            if (snapshot.exists()) {
              const data: Ingredients = snapshot.val()
              setIngredients(data)
            } else {
              setIngredients({})
            }
          })
          .catch((err) => {
            console.error(`Data get error: ${err.code} ${err.message} ${err.stack}`)
          })
      })
    }
  }, [pantryPath])

  return { isLoading, ingredients }
}
