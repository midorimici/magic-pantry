import { Button, Stack, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'

type Props = {
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddIngredientSuggestion: React.FC<Props> = ({ setShowDialog }) => {
  return (
    <Stack alignItems="center" gap={2} justifyContent="center" sx={{ height: '80vh' }}>
      <Typography>{`You don't have any ingredients yet.`}</Typography>
      <Button startIcon={<Add />} variant="contained" onClick={() => setShowDialog(true)}>
        Add ingredients
      </Button>
    </Stack>
  )
}
