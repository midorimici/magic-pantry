import { useRecoilValue } from 'recoil'
import { NextPage } from 'next'
import { SignIn } from 'components/templates'
import { useAuthState, useSignOutHandler } from 'hooks'
import { authUserState } from 'states/auth/atom'

const SignInPage: NextPage = () => {
  const user = useRecoilValue(authUserState)
  const { isLoading, handleSignOut } = useSignOutHandler()
  const { isLoadingAuthState } = useAuthState()

  return (
    <SignIn
      isLoading={isLoading || isLoadingAuthState}
      isLoggedIn={user !== null}
      handleSignOutButtonClick={handleSignOut}
    />
  )
}

export default SignInPage
