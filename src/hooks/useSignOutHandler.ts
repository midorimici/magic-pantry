import { useState } from 'react'
import { useResetRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import { signOut, AuthError } from '@firebase/auth'
import { auth } from 'lib/firebase'
import { loadingHandler } from 'lib/loadingHandler'
import { authUserState } from 'states/auth/atom'
import { ingredientsState } from 'states/pantry/atom'

export const useSignOutHandler = () => {
  const [isLoading, setIsLoading] = useState(false)
  const resetUser = useResetRecoilState(authUserState)
  const resetIngredients = useResetRecoilState(ingredientsState)
  const router = useRouter()

  const resetStates = () => {
    resetUser()
    resetIngredients()
  }

  const handleSignOut = () => {
    if (auth.currentUser === null) {
      return
    }

    let isSubscribed = true

    loadingHandler(setIsLoading, async () => {
      await signOut(auth)
        .then(() => {
          if (isSubscribed) {
            resetStates()
            router.push('/')
          }
        })
        .catch((err: AuthError) => {
          console.error(`Sign out failed: ${err.code} ${err.message} ${err.stack}`)
        })
    })

    return () => {
      isSubscribed = false
    }
  }

  return { isLoading, handleSignOut }
}
