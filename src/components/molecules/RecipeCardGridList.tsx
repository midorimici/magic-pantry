import { Grid } from '@mui/material'
import { RecipeCard } from 'components/atoms'

type Props = {
  recipes: Recipe[]
  onRecipeClick: (id: number) => void
}

export const RecipeCardGridList: React.FC<Props> = ({ recipes, onRecipeClick }) => {
  return (
    <Grid container spacing={2}>
      {recipes.map((recipe: Recipe) => (
        <Grid key={recipe.id} item xs={12} sm={4} md={3}>
          <RecipeCard recipe={recipe} onClick={onRecipeClick} />
        </Grid>
      ))}
    </Grid>
  )
}
