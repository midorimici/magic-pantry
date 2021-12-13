import { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { authUserState } from 'states/auth/atom'
import { auth } from 'lib/firebase'

export const useAuthState = () => {
  const [isLoadingAuthState, setIsLoadingAuthState] = useState(true)
  const setAuthUser = useSetRecoilState(authUserState)

  useEffect(() => {
    setIsLoadingAuthState(true)
    auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user)
      } else {
        setAuthUser(null)
      }
      setIsLoadingAuthState(false)
    })
  }, [])

  return { isLoadingAuthState }
}
