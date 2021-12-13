import { Typography } from '@mui/material'

export const TopDescription: React.FC = () => {
  return (
    <>
      <Typography component="p" gutterBottom variant="h5">
        helps you plan your meals from the ingredients in your pantry or fridge.
      </Typography>
      <Typography>
        Just add ingredients to this pantry, and you will get some suggestions of dishes 😋
      </Typography>
    </>
  )
}
