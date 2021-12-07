import Image from 'next/image'
import {
  Autocomplete,
  Box,
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
import { useAutoSuggestion, useIngredientDialog, Mode } from './hooks'

type Props = {
  mode: Mode
  updateId?: string | null
  showDialog: boolean
  onCloseDialog: () => void
}

export const IngredientDialog: React.FC<Props> = ({
  mode,
  updateId,
  showDialog,
  onCloseDialog,
}) => {
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
    handleKeyDown,
    handleAddButtonClick,
    handleUpdateButtonClick,
  } = useIngredientDialog(mode, onCloseDialog, updateId)
  const { suggestions, handleIngredientChange } = useAutoSuggestion()

  const title = mode === 'add' ? 'Add ingredients to pantry' : 'Edit ingredient details'

  const ActionButtons = () => {
    if (mode === 'add') {
      return (
        <Button variant="contained" onClick={() => handleAddButtonClick()}>
          Add
        </Button>
      )
    } else {
      return (
        <>
          <Button color="warning" variant="contained" onClick={() => handleAddButtonClick()}>
            Delete
          </Button>
          <Button
            disabled={!updateId}
            variant="contained"
            onClick={() => handleUpdateButtonClick(updateId)}
          >
            Update
          </Button>
        </>
      )
    }
  }

  return (
    <Dialog open={showDialog} onClose={onCloseDialog}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack gap={4} sx={{ width: '30rem' }}>
          <Stack alignItems="center" direction="row" gap={1}>
            <Autocomplete
              disableClearable
              freeSolo
              inputValue={ingredient}
              loading={suggestions === undefined}
              options={suggestions ?? []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  autoFocus
                  error={ingredient === '' && ingredientValidationError !== ''}
                  helperText={ingredient === '' && ingredientValidationError}
                  inputProps={{ ...params.inputProps, style: { textAlign: 'right' } }}
                  label="Ingredient"
                  variant="standard"
                />
              )}
              onInputChange={(_: React.SyntheticEvent, value: string) => {
                setIngredient(value)
                handleIngredientChange(value)
              }}
              sx={{ flex: 1 }}
            />
            <Close />
            <TextField
              error={quantity === '' && quantityValidationError !== ''}
              helperText={quantity === '' && quantityValidationError}
              label="Quantity"
              value={quantity}
              variant="standard"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuantity(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{ flex: 1 }}
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
      <Stack direction="row">
        <Box sx={{ flexGrow: 1, p: 1 }}>
          <Image
            alt="edamam-badge"
            height={40}
            src="https://developer.edamam.com/images/transparent.png"
            width={200}
          />
        </Box>
        <DialogActions>
          <Button onClick={onCloseDialog}>Cancel</Button>
          <ActionButtons />
        </DialogActions>
      </Stack>
    </Dialog>
  )
}
