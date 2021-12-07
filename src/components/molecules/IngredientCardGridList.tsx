import { Grid } from '@mui/material'
import { IngredientCard } from 'components/atoms'

type Props = {
  ings: Ingredients
}

export const IngredientCardGridList: React.FC<Props> = ({ ings }) => {
  return (
    <Grid container spacing={2}>
      {Object.entries(ings).map(([key, ing]: [string, Ingredient]) => (
        <Grid key={key} item xs={3}>
          <IngredientCard ing={ing} />
        </Grid>
      ))}
    </Grid>
  )
}
