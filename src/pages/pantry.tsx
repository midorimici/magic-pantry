import { useRecoilValue } from 'recoil'
import type { NextPage } from 'next'
import { Pantry } from 'components/templates'
import { useAuthState, useSignOutHandler } from 'hooks'
import { authUserState } from 'states/auth/atom'
import { ingredientsState } from 'states/pantry/atom'

const PantryPage: NextPage = () => {
  const user = useRecoilValue(authUserState)
  const ingredients = useRecoilValue(ingredientsState)
  const { isLoading, handleSignOut } = useSignOutHandler()
  const { isLoadingAuthState } = useAuthState()

  return (
    <Pantry
      isLoading={isLoading || isLoadingAuthState}
      isLoggedIn={user !== null}
      noIngredient={ingredients.length === 0}
      handleSignOutButtonClick={handleSignOut}
    />
  )
}

export default PantryPage
