import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { signOut, AuthError } from '@firebase/auth'
import { auth } from 'lib/firebase'
import { loadingHandler } from 'lib/loadingHandler'
import { authUserState } from 'states/auth/atom'

export const useSignOutHandler = () => {
  const [isLoading, setIsLoading] = useState(false)
  const setUser = useSetRecoilState(authUserState)

  const handleSignOut = () => {
    if (auth.currentUser === null) {
      return
    }

    loadingHandler(setIsLoading, async () => {
      await signOut(auth)
        .then(() => setUser(null))
        .catch((err: AuthError) => {
          console.error(`Sign out failed: ${err.code} ${err.message} ${err.stack}`)
        })
    })
  }

  return { isLoading, handleSignOut }
}
