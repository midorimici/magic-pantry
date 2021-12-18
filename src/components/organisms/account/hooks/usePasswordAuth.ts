import { useState } from 'react'
import { signInWithEmailAndPassword, AuthError, AuthErrorCodes } from '@firebase/auth'
import { auth } from 'lib/firebase'
import { loadingHandler } from 'lib/loadingHandler'

export const usePasswordAuth = (password: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isCorrectPassword, setIsCorrectPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleContinueButtonClick = () => {
    if (auth.currentUser?.email) {
      const email = auth.currentUser.email
      loadingHandler(setIsLoading, async () => {
        await signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            setIsCorrectPassword(true)
            setErrorMessage('')
          })
          .catch((err: AuthError) => {
            console.error(`Sign in failed: ${err.code} ${err.message} ${err.stack}`)
            if (err.code === AuthErrorCodes.INVALID_PASSWORD) {
              setErrorMessage('Wrong password. Please try again.')
            } else {
              setErrorMessage('Unexpected error.')
            }
          })
      })
    }
  }

  const resetState = () => setIsCorrectPassword(false)

  return { isLoading, isCorrectPassword, errorMessage, handleContinueButtonClick, resetState }
}
