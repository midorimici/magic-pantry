import { Typography } from '@mui/material'
import { CardGridListSkeleton, RecipeCardGridList } from 'components/molecules'
import { useRecipes } from './hooks'

export const RecipeBoard: React.FC = () => {
  const { recipes, error } = useRecipes()

  if (error) {
    return <Typography color="red">{error.statusText}</Typography>
  }

  if (recipes === undefined) {
    return <CardGridListSkeleton />
  }

  return <RecipeCardGridList recipes={recipes} />
}
