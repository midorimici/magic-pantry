import { AddFab } from 'components/atoms'
import {
  AddIngredientSuggestion,
  IngredientCardGridList,
  IngredientCardSkeleton,
} from 'components/molecules'
import { useIngredients } from './hooks'

type Props = {
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export const IngredientBoard: React.FC<Props> = ({ setShowDialog }) => {
  const { isLoading, ingredients } = useIngredients()

  if (isLoading) {
    return <IngredientCardSkeleton />
  }

  if (Object.keys(ingredients).length === 0) {
    return <AddIngredientSuggestion setShowDialog={setShowDialog} />
  }

  return (
    <>
      <IngredientCardGridList ings={ingredients} />
      <AddFab onClick={() => setShowDialog(true)} />
    </>
  )
}
