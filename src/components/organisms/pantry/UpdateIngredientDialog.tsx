import { IngredientDialog } from './IngredientDialog'

type Props = {
  updateId: string | null
  onCloseDialog: () => void
}

export const UpdateIngredientDialog: React.FC<Props> = ({ updateId, onCloseDialog }) => {
  return (
    <IngredientDialog
      mode="update"
      showDialog={!!updateId}
      updateId={updateId}
      onCloseDialog={onCloseDialog}
    />
  )
}
