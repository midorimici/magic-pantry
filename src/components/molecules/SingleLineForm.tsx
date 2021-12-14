import { forwardRef } from 'react'
import { Button, CircularProgress, Stack, TextField } from '@mui/material'

type Props = {
  /** Condition to make textfield red */
  validationError?: boolean
  /** Helper text showing below textfield */
  validationMessage?: string
  /** Condition to replace button with progress circle */
  isLoading: boolean
  /** Input type */
  type: 'email' | 'password'
  /** Condition to disable button */
  buttonDisabled?: boolean
  /** Label text on button */
  buttonLabel: string
  /** Contents of the textfield */
  value: string
  /** Process when textfield content changed */
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  /** Process when button clicked */
  handleButtonClick: () => void
}

const SingleLineForm: React.ForwardRefRenderFunction<HTMLTextAreaElement, Props> = (
  {
    validationError,
    validationMessage,
    isLoading,
    type,
    buttonDisabled,
    buttonLabel,
    value,
    handleChange,
    handleButtonClick,
  },
  ref: React.ForwardedRef<HTMLTextAreaElement>
) => {
  const label = `${type[0].toUpperCase()}${type.slice(1)}`

  return (
    <form>
      <Stack alignItems="stretch" direction={{ xs: 'column', sm: 'row' }} gap={2}>
        <TextField
          autoFocus
          error={validationError}
          helperText={validationMessage}
          inputRef={ref}
          label={label}
          type={type}
          value={value}
          sx={{ flexGrow: 1 }}
          onChange={handleChange}
        />
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button
            disabled={buttonDisabled}
            type="submit"
            variant="contained"
            onClick={handleButtonClick}
          >
            {buttonLabel}
          </Button>
        )}
      </Stack>
    </form>
  )
}

export const SingleLineFormWithRef = forwardRef<HTMLTextAreaElement, Props>(SingleLineForm)
