import { IngredientDialog } from './IngredientDialog'

type Props = {
  showDialog: boolean
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddIngredientDialog: React.FC<Props> = ({ showDialog, setShowDialog }) => {
  return (
    <IngredientDialog
      mode="add"
      showDialog={showDialog}
      onCloseDialog={() => setShowDialog(false)}
    />
  )
}
