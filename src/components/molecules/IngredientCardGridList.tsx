import { Grid } from '@mui/material'
import { IngredientCard } from 'components/atoms'

type Props = {
  ings: Ingredients
  onCardClick: (id: string) => void
}

export const IngredientCardGridList: React.FC<Props> = ({ ings, onCardClick }) => {
  return (
    <Grid container spacing={2}>
      {Object.entries(ings).map(([key, ing]: [string, Ingredient]) => (
        <Grid key={key} item xs={12} sm={4} md={3}>
          <IngredientCard id={key} ing={ing} onClick={onCardClick} />
        </Grid>
      ))}
    </Grid>
  )
}
