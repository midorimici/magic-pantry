import { useState } from 'react'
import { Meta, PageTitle } from 'components/atoms'
import { Container, HeaderProps } from 'components/molecules'
import {
  AddIngredientDialog,
  IngredientBoard,
  UpdateIngredientDialog,
} from 'components/organisms/pantry'

export const Pantry: React.FC<HeaderProps> = (props) => {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [visibleEditDialogId, setVisibleEditDialogId] = useState<string | null>(null)

  return (
    <>
      <Meta title="Pantry" />
      <Container {...props}>
        <PageTitle title="Pantry" />
        <IngredientBoard
          setShowAddDialog={setShowAddDialog}
          setVisibleEditDialogId={setVisibleEditDialogId}
        />
        <AddIngredientDialog showDialog={showAddDialog} setShowDialog={setShowAddDialog} />
        <UpdateIngredientDialog
          onCloseDialog={() => setVisibleEditDialogId(null)}
          updateId={visibleEditDialogId}
        />
      </Container>
    </>
  )
}
