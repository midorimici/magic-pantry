import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { GoogleAuthProvider, signInWithRedirect, AuthError } from '@firebase/auth'
import { auth } from 'lib/firebase'
import { authUserState } from 'states/auth/atom'

const SignIn: NextPage = () => {
  const setAuthUser = useSetRecoilState(authUserState)
  const router = useRouter()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user)
        router.push('/')
      }
    })
  }, [])

  const logIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider)
  }

  const logOut = () => {
    auth
      .signOut()
      .then(() => console.info('sign out'))
      .catch((err: AuthError) => {
        console.error(`Sign out failed: ${err.code} ${err.message} ${err.stack}`)
      })
  }

  return (
    <div>
      <button onClick={logIn}>Log in</button>
      <button onClick={logOut}>Log out</button>
    </div>
  )
}

export default SignIn
