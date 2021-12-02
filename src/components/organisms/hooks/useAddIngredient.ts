import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { ingredientsState } from 'states/pantry/atom'

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

    const registeredData = {
      name: ingredient,
      quantity,
      date,
      description,
    }
    setIngredients((prev) => {
      const newIngredients = [...prev]
      newIngredients.push(registeredData)
      console.info(newIngredients)
      return newIngredients
    })
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
