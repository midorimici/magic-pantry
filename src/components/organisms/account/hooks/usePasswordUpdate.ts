import { useState } from 'react'
import { updatePassword, AuthError } from '@firebase/auth'
import { auth } from 'lib/firebase'
import { loadingHandler } from 'lib/loadingHandler'

export const usePasswordUpdate = (password: string, resetStates: () => void) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [updateButtonClicked, setUpdateButtonClicked] = useState(false)

  const handleUpdateButtonClick = () => {
    if (auth.currentUser) {
      const user = auth.currentUser
      loadingHandler(setIsLoading, async () => {
        await updatePassword(user, password).catch((err: AuthError) => {
          console.error(`Password update failed: ${err.code} ${err.message} ${err.stack}`)
          setIsError(true)
        })
        resetStates()
      })
      setUpdateButtonClicked(true)
      setTimeout(() => setUpdateButtonClicked(false), 5000)
    }
  }

  return { isLoading, isError, updateButtonClicked, handleUpdateButtonClick }
}
