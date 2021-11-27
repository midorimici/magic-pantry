import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { DatePicker, LocalizationProvider } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDateFns'
import { useAddIngredient } from './hooks'

type Props = {
  showDialog: boolean
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddIngredientDialog: React.FC<Props> = ({ showDialog, setShowDialog }) => {
  const {
    ingredient,
    setIngredient,
    quantity,
    setQuantity,
    date,
    setDate,
    description,
    setDescription,
    ingredientValidationError,
    quantityValidationError,
    handleRegistration,
  } = useAddIngredient()

  return (
    <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
      <DialogTitle>Add ingredients to pantry</DialogTitle>
      <DialogContent>
        <Stack gap={4}>
          <Stack alignItems="center" direction="row" gap={1}>
            <TextField
              autoFocus
              error={ingredient === '' && ingredientValidationError !== ''}
              helperText={ingredient === '' && ingredientValidationError}
              inputProps={{ style: { textAlign: 'right' } }}
              label="Ingredient"
              value={ingredient}
              variant="standard"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setIngredient(e.target.value)
              }
            />
            <Close />
            <TextField
              error={quantity === '' && quantityValidationError !== ''}
              helperText={quantity === '' && quantityValidationError}
              label="Quantity"
              value={quantity}
              variant="standard"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuantity(e.target.value)}
            />
          </Stack>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
              inputFormat="MM/dd"
              label="Date"
              mask="__/__"
              renderInput={(params) => <TextField {...params} />}
              value={date}
              onChange={(newValue) => setDate(newValue ?? new Date())}
            />
          </LocalizationProvider>
          <TextField
            label="Description"
            multiline
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowDialog(false)}>Cancel</Button>
        <Button variant="contained" onClick={() => handleRegistration()}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}
