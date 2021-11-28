import { atom } from 'recoil'
import type { User } from '@firebase/auth'

export const authUserState = atom<User | null>({
  key: 'auth_user',
  default: null,
  dangerouslyAllowMutability: true,
})
