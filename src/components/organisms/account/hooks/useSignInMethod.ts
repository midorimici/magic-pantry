import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { fetchSignInMethodsForEmail, AuthError, SignInMethod } from '@firebase/auth'
import { auth } from 'lib/firebase'
import { loadingHandler } from 'lib/loadingHandler'
import { authUserState } from 'states/auth/atom'

export const useSignInMethod = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [isEmailPasswordAuth, setIsEmailPasswordAuth] = useState(false)
  const authUser = useRecoilValue(authUserState)

  useEffect(() => {
    if (authUser?.email) {
      const email = authUser.email
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
  }, [authUser])

  return { isLoading, isError, isEmailPasswordAuth }
}
