import { useRecoilValue } from 'recoil'
import type { NextPage } from 'next'
import { Pantry } from 'components/templates'
import { useAuthState, useSignOutHandler } from 'hooks'
import { authUserState } from 'states/auth/atom'

const PantryPage: NextPage = () => {
  const user = useRecoilValue(authUserState)
  const { isLoading, handleSignOut } = useSignOutHandler()
  const { isLoadingAuthState } = useAuthState()

  return (
    <Pantry
      isLoading={isLoading || isLoadingAuthState}
      isLoggedIn={user !== null}
      handleSignOutButtonClick={handleSignOut}
    />
  )
}

export default PantryPage
