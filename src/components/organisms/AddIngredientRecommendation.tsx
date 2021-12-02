import { useRecoilValue } from 'recoil'
import { Button, Stack, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import { ingredientsState } from 'states/pantry/atom'

type Props = {
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddIngredientRecommendation: React.FC<Props> = ({ setShowDialog }) => {
  const ingredients = useRecoilValue(ingredientsState)

  if (ingredients.length > 0) {
    return null
  }

  return (
    <Stack alignItems="center" gap={2} justifyContent="center" sx={{ height: '80vh' }}>
      <Typography>{`You don't have any ingredients yet.`}</Typography>
      <Button startIcon={<Add />} variant="contained" onClick={() => setShowDialog(true)}>
        Add ingredients
      </Button>
    </Stack>
  )
}
