import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { push, ref, remove, update } from '@firebase/database'
import { ingredientsState } from 'states/pantry/atom'
import { useDatabasePaths } from 'hooks'
import { db } from 'lib/firebase'

export type Mode = 'add' | 'update'

export const useIngredientDialog = (handleCloseDialog: () => void, updateId?: string | null) => {
  const [ingredients, setIngredients] = useRecoilState(ingredientsState)
  const [ingredient, setIngredient] = useState('')
  const [quantity, setQuantity] = useState('')
  const [date, setDate] = useState(new Date())
  const [description, setDescription] = useState('')
  const [ingredientValidationError, setIngredientValidationError] = useState('')
  const [quantityValidationError, setQuantityValidationError] = useState('')
  const { pantryPath } = useDatabasePaths()

  useEffect(() => {
    if (updateId) {
      const ing = ingredients[updateId]
      setIngredient(ing.name)
      setQuantity(ing.quantity)
      setDate(new Date(ing.date))
      setDescription(ing.description)
    }
  }, [updateId])

  const handleAddButtonClick = () => {
    handleRegistration('add')
    handleCloseDialog()
  }

  const handleUpdateButtonClick = (updateId?: string | null) => {
    if (updateId) {
      handleRegistration('update', updateId)
      handleCloseDialog()
    }
  }

  const handleDeleteButtonClick = (updateId?: string | null) => {
    if (updateId) {
      removeIngredient(updateId)
      handleCloseDialog()
    }
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
    // Update ingredient in DB
    update(ref(db), { [`${pantryPath}/${id}`]: data })

    // Update ingredient state
    setIngredients((prev) => {
      const newIngredients = { ...prev }
      newIngredients[id] = data
      return newIngredients
    })
  }

  const removeIngredient = (id: string) => {
    // Remove ingredient from DB
    remove(ref(db, `${pantryPath}/${id}`))

    // Remove ingredient from state
    setIngredients((prev) => {
      const newIngredients = { ...prev }
      delete newIngredients[id]
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
    handleAddButtonClick,
    handleUpdateButtonClick,
    handleDeleteButtonClick,
  }
}
