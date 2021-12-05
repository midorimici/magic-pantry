import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { authUserState } from 'states/auth/atom'

export const useDatabasePaths = () => {
  const [pantryPath, setPantryPath] = useState('')
  const authUser = useRecoilValue(authUserState)

  useEffect(() => {
    if (authUser === null) {
      return
    }

    setPantryPath(`pantries/${authUser.uid}`)
  }, [authUser])

  return { pantryPath }
}
