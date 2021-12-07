import { atom } from 'recoil'

export const ingredientsState = atom<Ingredients>({
  key: 'ingredients',
  default: {},
})
