import { useEffect, useState } from 'react'
import { fetchSignInMethodsForEmail, AuthError, SignInMethod } from '@firebase/auth'
import { auth } from 'lib/firebase'
import { loadingHandler } from 'lib/loadingHandler'

export const useSignInMethod = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [isEmailPasswordAuth, setIsEmailPasswordAuth] = useState(false)

  useEffect(() => {
    if (auth.currentUser?.email) {
      const email = auth.currentUser.email
      loadingHandler(setIsLoading, async () => {
        await fetchSignInMethodsForEmail(auth, email)
          .then((methods: string[]) => {
            if (methods.includes(SignInMethod.EMAIL_PASSWORD)) {
              setIsEmailPasswordAuth(true)
            }
          })
          .catch((err: AuthError) => {
            console.error(`Sign in method fetch failed: ${err.code} ${err.message} ${err.stack}`)
            setIsError(true)
          })
      })
    }
  }, [])

  return { isLoading, isError, isEmailPasswordAuth }
}
