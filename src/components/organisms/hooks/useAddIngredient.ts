import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { push, ref } from '@firebase/database'
import { ingredientsState } from 'states/pantry/atom'
import { auth, db } from 'lib/firebase'

export const useAddIngredient = () => {
  const [ingredient, setIngredient] = useState('')
  const [quantity, setQuantity] = useState('')
  const [date, setDate] = useState(new Date())
  const [description, setDescription] = useState('')
  const [ingredientValidationError, setIngredientValidationError] = useState('')
  const [quantityValidationError, setQuantityValidationError] = useState('')
  const setIngredients = useSetRecoilState(ingredientsState)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleRegistration()
    }
  }

  const handleRegistration = () => {
    if (ingredient === '') {
      setIngredientValidationError('Please provide ingredient name.')
    }

    if (quantity === '') {
      setQuantityValidationError('Please provide quantity.')
    }

    if (ingredient === '' || quantity === '') {
      return
    }

    const registeredData: Ingredient = {
      name: ingredient,
      quantity,
      date,
      description,
    }

    addToDatabase(registeredData)

    setIngredients((prev) => {
      const newIngredients = [...prev]
      newIngredients.push(registeredData)
      return newIngredients
    })
  }

  const addToDatabase = (data: Ingredient) => {
    const uid = auth.currentUser?.uid
    if (uid === undefined) {
      return
    }

    push(ref(db, `pantries/${uid}`), data)
  }

  return {
    ingredient,
    setIngredient,
    quantity,
    setQuantity,
    date,
    setDate,
    description,
    setDescription,
    ingredientValidationError,
    quantityValidationError,
    handleKeyDown,
    handleRegistration,
  }
}
