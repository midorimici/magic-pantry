import { Grid } from '@mui/material'
import { RecipeCard } from 'components/atoms'

type Props = {
  recipes: Recipe[]
}

export const RecipeCardGridList: React.FC<Props> = ({ recipes }) => {
  return (
    <Grid container spacing={2}>
      {recipes.map((recipe: Recipe) => (
        <Grid key={recipe.id} item xs={3}>
          <RecipeCard recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  )
}
