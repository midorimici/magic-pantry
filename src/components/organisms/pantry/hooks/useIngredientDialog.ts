import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { push, ref } from '@firebase/database'
import { ingredientsState } from 'states/pantry/atom'
import { useDatabasePaths } from 'hooks'
import { db } from 'lib/firebase'

export type Mode = 'add' | 'update'

export const useIngredientDialog = (
  mode: Mode,
  handleCloseDialog: () => void,
  updateId?: string
) => {
  const [ingredients, setIngredients] = useRecoilState(ingredientsState)
  const [ingredient, setIngredient] = useState(updateId ? ingredients[updateId].name : '')
  const [quantity, setQuantity] = useState(updateId ? ingredients[updateId].quantity : '')
  const [date, setDate] = useState(updateId ? new Date(ingredients[updateId].date) : new Date())
  const [description, setDescription] = useState(updateId ? ingredients[updateId].description : '')
  const [ingredientValidationError, setIngredientValidationError] = useState('')
  const [quantityValidationError, setQuantityValidationError] = useState('')
  const { pantryPath } = useDatabasePaths()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleRegistration(mode)
    }
  }

  const handleAddButtonClick = () => {
    handleRegistration('add')
    handleCloseDialog()
  }

  const handleUpdateButtonClick = (updateId?: string) => {
    if (updateId === undefined) {
      return
    }

    handleRegistration('update', updateId)
    handleCloseDialog()
  }

  const handleRegistration = (mode: Mode, updateId?: string) => {
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

    if (mode === 'add') {
      addIngredient(registeredData)
    } else if (mode === 'update' && updateId) {
      updateIngredient(registeredData, updateId)
    }
  }

  const addIngredient = (data: Ingredient) => {
    // Add new ingredient to DB
    const key = push(ref(db, pantryPath), data).key as string

    // Add new ingredient to state
    setIngredients((prev) => {
      const newIngredients = { ...prev }
      newIngredients[key] = data
      return newIngredients
    })
  }

  const updateIngredient = (data: Ingredient, id: string) => {
    console.info(id, ingredients[id])
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
    handleUpdateButtonClick,
  }
}
