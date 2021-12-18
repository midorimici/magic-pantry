import { useState } from 'react'

export const useFormHandlers = () => {
  const [showForms, setShowForms] = useState(false)

  const handleShowForms = () => {
    setShowForms(true)
  }

  const hideForms = () => setShowForms(false)

  return { showForms, handleShowForms, hideForms }
}
