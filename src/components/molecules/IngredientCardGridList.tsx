import { Grid } from '@mui/material'
import { IngredientCard } from 'components/atoms'

type Props = {
  ings: Ingredient[]
}

export const IngredientCardGridList: React.FC<Props> = ({ ings }) => {
  return (
    <Grid container spacing={2}>
      {ings.map((ing: Ingredient, index: number) => (
        <Grid key={index} item xs={3}>
          <IngredientCard ing={ing} />
        </Grid>
      ))}
    </Grid>
  )
}
