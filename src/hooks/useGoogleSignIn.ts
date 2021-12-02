import { useState } from 'react'
import { useRecoilValue } from 'recoil'
// import { useRouter } from 'next/router'
import { GoogleAuthProvider, signInWithRedirect } from '@firebase/auth'
import { auth } from 'lib/firebase'
import { authUserState } from 'states/auth/atom'

export const useGoogleSignIn = () => {
  const authUser = useRecoilValue(authUserState)
  const [isLoading, setIsLoading] = useState(false)
  // const router = useRouter()

  const googleSignIn = () => {
    if (authUser) {
      return
    }

    setIsLoading(true)

    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider)
  }

  return { isLoading, googleSignIn }
}
