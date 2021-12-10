import { AddFab } from 'components/atoms'
import {
  AddIngredientSuggestion,
  IngredientCardGridList,
  CardGridListSkeleton,
} from 'components/molecules'
import { useIngredients } from 'hooks'
import { useCardClickEventHandler } from './hooks'

type Props = {
  setShowAddDialog: React.Dispatch<React.SetStateAction<boolean>>
  setVisibleEditDialogId: React.Dispatch<React.SetStateAction<string | null>>
}

export const IngredientBoard: React.FC<Props> = ({ setShowAddDialog, setVisibleEditDialogId }) => {
  const { isLoading, ingredients } = useIngredients()
  const { handleCardClick } = useCardClickEventHandler(setVisibleEditDialogId)

  if (isLoading) {
    return <CardGridListSkeleton />
  }

  if (Object.keys(ingredients).length === 0) {
    return <AddIngredientSuggestion setShowDialog={setShowAddDialog} />
  }

  return (
    <>
      <IngredientCardGridList ings={ingredients} onCardClick={handleCardClick} />
      <AddFab onClick={() => setShowAddDialog(true)} />
    </>
  )
}
