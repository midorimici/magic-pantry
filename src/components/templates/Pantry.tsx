import { useState } from 'react'
import { Meta } from 'components/atoms'
import { Container, HeaderProps } from 'components/molecules'
import { AddIngredientDialog, IngredientBoard } from 'components/organisms'

export const Pantry: React.FC<HeaderProps> = (props) => {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <Meta title="Pantry" />
      <Container {...props}>
        <IngredientBoard setShowDialog={setShowDialog} />
        <AddIngredientDialog showDialog={showDialog} setShowDialog={setShowDialog} />
      </Container>
    </>
  )
}
