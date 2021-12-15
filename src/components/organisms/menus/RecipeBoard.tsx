import { Typography } from '@mui/material'
import { SpoonacularBacklink } from 'components/atoms'
import { CardGridListSkeleton, RecipeCardGridList, RecipeDetailsDialog } from 'components/molecules'
import { useRecipeDetails, useRecipes } from './hooks'

export const RecipeBoard: React.FC = () => {
  const { recipes, error } = useRecipes()
  const { recipeInfo, recipeDetailError, resetRecipe, handleRecipeClick } = useRecipeDetails()

  if (error) {
    return <Typography color="red">{error.message}</Typography>
  }

  if (recipeDetailError) {
    return <Typography color="red">{recipeDetailError.message}</Typography>
  }

  if (recipes === undefined) {
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
      <RecipeDetailsDialog
        missed={missedIngs}
        recipe={recipeInfo}
        used={usedIngs}
        onCloseDialog={resetRecipe}
      />
    </>
  )
}
