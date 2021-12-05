import {
  AddIngredientSuggestion,
  IngredientCardGridList,
  IngredientCardSkeleton,
} from 'components/molecules'
import { useIngredients } from './hooks/useIngredients'

type Props = {
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export const IngredientBoard: React.FC<Props> = ({ setShowDialog }) => {
  const { isLoading, ingredients } = useIngredients()

  if (isLoading) {
    return <IngredientCardSkeleton />
  }

  if (ingredients.length > 0) {
    return <IngredientCardGridList ings={ingredients} />
  }

  return <AddIngredientSuggestion setShowDialog={setShowDialog} />
}
