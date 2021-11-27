import { atom } from 'recoil'

export const ingredientsState = atom<Ingredient[]>({
  key: 'ingredients',
  default: [],
})
