import { Link, Typography } from '@mui/material'

export const SpoonacularBacklink: React.FC = () => {
  return (
    <Typography variant="body2" sx={{ position: 'absolute', bottom: '2rem', right: '2rem' }}>
      Powered by <Link href="https://spoonacular.com/food-api">spoonacular API</Link>
    </Typography>
  )
}
