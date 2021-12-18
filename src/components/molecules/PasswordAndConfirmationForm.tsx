import { Button, CircularProgress, Stack, TextField } from '@mui/material'

type Props = {
  /** Helper text showing below textfield */
  validationMessage: string | null
  /** Passwords don't match */
  mismatch: boolean
  /** Condition to replace button with progress circle */
  isLoading: boolean
  /** Label text on button */
  buttonLabel: string
  /** Label text of textfield. Default value is 'Password'. */
  passwordLabel?: string
  /** Process when password textfield content changed */
  handlePasswordChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  /** Process when password confirmation textfield content changed */
  handleConfirmationChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  /** Process when button clicked */
  handleButtonClick: () => void
}

export const PasswordAndConfirmationForm: React.FC<Props> = ({
  validationMessage,
  mismatch,
  isLoading,
  buttonLabel,
  passwordLabel = 'Password',
  handlePasswordChange,
  handleConfirmationChange,
  handleButtonClick,
}) => {
  return (
    <form>
      <Stack alignItems="stretch" gap={2}>
        <TextField
          autoFocus
          error={validationMessage !== null && validationMessage !== ''}
          helperText={validationMessage}
          label={passwordLabel}
          type="password"
          onChange={handlePasswordChange}
        />
        <TextField
          error={mismatch}
          helperText={mismatch && "Passwords don't match."}
          label={`${passwordLabel} (confirmation)`}
          type="password"
          onChange={handleConfirmationChange}
        />
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button
            disabled={validationMessage !== '' || mismatch}
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
