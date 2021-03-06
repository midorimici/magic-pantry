import { Grid, Skeleton } from '@mui/material'

export const CardGridListSkeleton: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {[...Array(4)].map((_, index: number) => (
        <Grid key={index} item xs={12} sm={4} md={3}>
          <Skeleton height={150} />
        </Grid>
      ))}
    </Grid>
  )
}
