import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { push, ref } from '@firebase/database'
import { ingredientsState } from 'states/pantry/atom'
import { useDatabasePaths } from 'hooks'
import { db } from 'lib/firebase'

export const useAddIngredient = (setShowDialog: React.Dispatch<React.SetStateAction<boolean>>) => {
  const [ingredient, setIngredient] = useState('')
  const [quantity, setQuantity] = useState('')
  const [date, setDate] = useState(new Date())
  const [description, setDescription] = useState('')
  const [ingredientValidationError, setIngredientValidationError] = useState('')
  const [quantityValidationError, setQuantityValidationError] = useState('')
  const setIngredients = useSetRecoilState(ingredientsState)
  const { pantryPath } = useDatabasePaths()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleRegistration()
    }
  }

  const handleAddButtonClick = () => {
    handleRegistration()
    setShowDialog(false)
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
      date: date.toISOString(),
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
    push(ref(db, pantryPath), data)
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
    handleAddButtonClick,
  }
}
