import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'

type Props = {
  recipe: Recipe
  onClick: (id: number) => void
}

export const RecipeCard: React.FC<Props> = ({ recipe, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      elevation={isHovered ? 4 : 1}
      onClick={() => onClick(recipe.id)}
      onMouseOut={() => setIsHovered(false)}
      onMouseOver={() => setIsHovered(true)}
      sx={{ cursor: 'pointer', height: '100%' }}
    >
      <CardMedia
        component={() => <Image alt={recipe.title} height={150} src={recipe.image} width={201} />}
      />
      <CardContent>
        <Typography>{recipe.title}</Typography>
      </CardContent>
    </Card>
  )
}
