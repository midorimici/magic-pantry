import { useRecoilValue } from 'recoil'
import { AddIngredientSuggestion, IngredientCardGridList } from 'components/molecules'
import { ingredientsState } from 'states/pantry/atom'

type Props = {
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export const IngredientBoard: React.FC<Props> = ({ setShowDialog }) => {
  const ingredients = useRecoilValue(ingredientsState)

  if (ingredients.length > 0) {
    return <IngredientCardGridList ings={ingredients} />
  }

  return <AddIngredientSuggestion setShowDialog={setShowDialog} />
}
