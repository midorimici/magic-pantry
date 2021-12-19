import NextLink from 'next/link'
import { Link, Typography } from '@mui/material'
import { CardGridListSkeleton, RecipeCardGridList, RecipeDetailsDrawer } from 'components/molecules'
import { useRecipeDetails, useRecipes } from './hooks'

export const RecipeBoard: React.FC = () => {
  const { recipes, error, noIngredient } = useRecipes()
  const { recipeInfo, recipeDetailError, resetRecipe, handleRecipeClick } = useRecipeDetails()

  if (noIngredient) {
    return (
      <>
        <Typography>{`You don't have any ingredients in the pantry yet.`}</Typography>
        <Typography>
          Please register ingredients in the{' '}
          <NextLink href="/pantry" passHref>
            <Link>pantry</Link>
          </NextLink>{' '}
          page.
        </Typography>
      </>
    )
  }

  if (error) {
    return <Typography color="red">{error.message}</Typography>
  }

  if (recipeDetailError) {
    return <Typography color="red">{recipeDetailError.message}</Typography>
  }

  if (recipes === null) {
    return <CardGridListSkeleton />
  }

  const recipeSelected = recipes.find((recipe: Recipe) => recipe.id === recipeInfo?.id)
  const missedIngs = recipeSelected?.missedIngredients.map((ing: IngredientResponse) => ({
    id: ing.id,
    name: ing.name,
  }))
  const usedIngs = recipeSelected?.usedIngredients.map((ing: IngredientResponse) => ({
    id: ing.id,
    name: ing.name,
  }))

  return (
    <>
      <RecipeCardGridList recipes={recipes} onRecipeClick={handleRecipeClick} />
      <RecipeDetailsDrawer
        missed={missedIngs}
        recipe={recipeInfo}
        used={usedIngs}
        onCloseDrawer={resetRecipe}
      />
    </>
  )
}
