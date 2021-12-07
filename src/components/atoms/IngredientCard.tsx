import { useState } from 'react'
import { formatDistance } from 'date-fns'
import { Card, CardContent, Typography } from '@mui/material'

type Props = {
  id: string
  ing: Ingredient
  onClick: (id: string) => void
}

export const IngredientCard: React.FC<Props> = ({ id, ing, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      elevation={isHovered ? 4 : 1}
      onClick={() => onClick(id)}
      onMouseOut={() => setIsHovered(false)}
      onMouseOver={() => setIsHovered(true)}
      sx={{ cursor: 'pointer' }}
    >
      <CardContent>
        <Typography>{ing.name}</Typography>
        <Typography color="text.secondary">{ing.quantity}</Typography>
        <Typography color="text.secondary">
          {formatDistance(new Date(ing.date), new Date(), { addSuffix: true })}
        </Typography>
        {ing.description && <Typography>{ing.description}</Typography>}
      </CardContent>
    </Card>
  )
}
