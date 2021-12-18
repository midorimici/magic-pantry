import { useState } from 'react'

export const usePasswordHandlers = () => {
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [passwordMismatch, setPasswordMismatch] = useState(false)
  const [passwordValidationMessage, setPasswordValidationMessage] = useState<string | null>(null)

  const handlePasswordChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPassword(e.target.value)
  }

  const handlePasswordChangeWithValidation = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setPassword(value)

    // Validate password
    if (value.length < 8) {
      setPasswordValidationMessage('Password should be at least 8 characters long.')
      return
    }

    if (!/[a-z]/.test(value)) {
      setPasswordValidationMessage('Password should contain at least one lowercase letters.')
      return
    }

    if (!/[A-Z]/.test(value)) {
      setPasswordValidationMessage('Password should contain at least one uppercase letters.')
      return
    }

    if (!/\d/.test(value)) {
      setPasswordValidationMessage('Password should contain at least one digit.')
      return
    }

    if (!/[^a-zA-Z0-9]/.test(value)) {
      setPasswordValidationMessage('Password should contain at least one special character.')
      return
    }

    setPasswordValidationMessage('')

    // Check if passwords match
    if (value !== passwordConfirmation) {
      setPasswordMismatch(true)
      return
    }

    setPasswordMismatch(false)
  }

  const handleConfirmationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setPasswordConfirmation(value)

    // Check if passwords match
    if (value !== password) {
      setPasswordMismatch(true)
      return
    }

    setPasswordMismatch(false)
  }

  const resetStates = () => {
    setPassword('')
    setPasswordConfirmation('')
    setPasswordMismatch(false)
    setPasswordValidationMessage(null)
  }

  return {
    password,
    passwordValidationMessage,
    passwordMismatch,
    handlePasswordChange,
    handlePasswordChangeWithValidation,
    handleConfirmationChange,
    resetStates,
  }
}
