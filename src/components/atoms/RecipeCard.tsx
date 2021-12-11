import { useState } from 'react'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'

type Props = {
  recipe: Recipe
}

export const RecipeCard: React.FC<Props> = ({ recipe }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      elevation={isHovered ? 4 : 1}
      onMouseOut={() => setIsHovered(false)}
      onMouseOver={() => setIsHovered(true)}
      sx={{ cursor: 'pointer', height: '100%' }}
    >
      <CardMedia alt={recipe.title} component="img" image={recipe.image} />
      <CardContent>
        <Typography>{recipe.title}</Typography>
      </CardContent>
    </Card>
  )
}
