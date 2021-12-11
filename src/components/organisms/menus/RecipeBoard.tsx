import { Typography } from '@mui/material'
import { SpoonacularBacklink } from 'components/atoms'
import { CardGridListSkeleton, RecipeCardGridList } from 'components/molecules'
import { useRecipes } from './hooks'

export const RecipeBoard: React.FC = () => {
  const { recipes, error } = useRecipes()

  if (error) {
    return <Typography color="red">{error.message}</Typography>
  }

  if (recipes === undefined) {
    return <CardGridListSkeleton />
  }

  return (
    <>
      <RecipeCardGridList recipes={recipes} />
      <SpoonacularBacklink />
    </>
  )
}
