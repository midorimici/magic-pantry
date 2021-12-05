import { Grid, Skeleton } from '@mui/material'

export const IngredientCardSkeleton: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {[...Array(4)].map((_, index: number) => (
        <Grid key={index} item xs={3}>
          <Skeleton height={150} />
        </Grid>
      ))}
    </Grid>
  )
}
