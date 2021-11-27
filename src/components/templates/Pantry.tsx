import { useState } from 'react'
import { Meta } from 'components/atoms'
import { Container, HeaderProps } from 'components/molecules'
import { AddIngredientDialog, AddIngredientRecommendation } from 'components/organisms'

type Props = {
  /** There is no ingredient in the pantry */
  noIngredient: boolean
} & HeaderProps

export const Pantry: React.FC<Props> = ({ noIngredient, ...props }) => {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <Meta title="Pantry" />
      <Container {...props}>
        {noIngredient && <AddIngredientRecommendation setShowDialog={setShowDialog} />}
        <AddIngredientDialog showDialog={showDialog} setShowDialog={setShowDialog} />
      </Container>
    </>
  )
}
