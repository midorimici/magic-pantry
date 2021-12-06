import { formatDistance } from 'date-fns'
import { Card, CardContent, Typography } from '@mui/material'

type Props = {
  ing: Ingredient
}

export const IngredientCard: React.FC<Props> = ({ ing }) => {
  return (
    <Card>
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
