import { useEffect, useState } from 'react'
import { deleteUser, AuthError } from '@firebase/auth'
import { auth } from 'lib/firebase'
import { loadingHandler } from 'lib/loadingHandler'

export const useDeleteAccount = (isCorrectPassword: boolean) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    if (isCorrectPassword) {
      deleteAccount()
    }
  }, [isCorrectPassword])

  const deleteAccount = () => {
    if (auth.currentUser) {
      const user = auth.currentUser
      loadingHandler(setIsLoading, async () => {
        await deleteUser(user)
          .then(() => setIsFinished(true))
          .catch((err: AuthError) => {
            console.error(`Password update failed: ${err.code} ${err.message} ${err.stack}`)
            setIsError(true)
          })
      })
    }
  }

  return { isLoading, isError, isFinished, deleteAccount }
}
