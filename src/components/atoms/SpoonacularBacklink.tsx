import { Link, Typography } from '@mui/material'

export const SpoonacularBacklink: React.FC = () => {
  return (
    <Typography gutterBottom variant="body2">
      Powered by <Link href="https://spoonacular.com/food-api">spoonacular API</Link>
    </Typography>
  )
}
