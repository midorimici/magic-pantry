import { Check, Close, Edit } from '@mui/icons-material'
import { Button, CircularProgress, Grow, Stack, Typography } from '@mui/material'
import { PasswordAndConfirmationForm, SingleLineForm } from 'components/molecules'
import { usePasswordHandlers } from 'hooks'
import { useFormHandlers, usePasswordAuth, usePasswordUpdate, useSignInMethod } from './hooks'

export const ChangePasswordForm: React.FC = () => {
  const {
    isLoading: isLoadingSignInMethod,
    isError: isSignInMethodError,
    isEmailPasswordAuth,
  } = useSignInMethod()

  const { showForms, handleShowForms, hideForms } = useFormHandlers()

  const {
    password,
    passwordValidationMessage,
    passwordMismatch,
    handlePasswordChange,
    handlePasswordChangeWithValidation,
    handleConfirmationChange,
    resetStates,
  } = usePasswordHandlers()

  const {
    isLoading: isLoadingPasswordCheck,
    isCorrectPassword,
    errorMessage,
    handleContinueButtonClick,
    resetState,
  } = usePasswordAuth(password)

  const {
    isLoading: isLoadingPasswordUpdate,
    isError: isPasswordUpdateError,
    updateButtonClicked,
    handleUpdateButtonClick,
  } = usePasswordUpdate(password, () => {
    hideForms()
    resetStates()
    resetState()
  })

  if (isLoadingSignInMethod) {
    return <CircularProgress aria-busy aria-describedby="loading-sign-in-method" />
  }

  if (!isEmailPasswordAuth || isSignInMethodError) {
    return null
  }

  const PasswordUpdateResult = ({ successed }: { successed: boolean }) => (
    <Stack alignItems="center" direction="row" gap={2}>
      {successed ? (
        <>
          <Grow in={successed}>
            <Check color="success" />
          </Grow>
          <Typography>Your password was updated successfully.</Typography>
        </>
      ) : (
        <>
          <Grow in={!successed}>
            <Close color="error" />
          </Grow>
          <Typography>Failed to update the password. Please try again.</Typography>
        </>
      )}
    </Stack>
  )

  return (
    <Stack alignItems="flex-start" gap={4}>
      {showForms ? (
        <Stack alignItems="center" direction="row" gap={2}>
          <Edit color="primary" />
          <Typography>Change password</Typography>
        </Stack>
      ) : (
        <Button disabled={showForms} variant="contained" onClick={handleShowForms}>
          Change password
        </Button>
      )}
      {showForms && !isCorrectPassword && (
        <SingleLineForm
          buttonDisabled={password === ''}
          buttonLabel="Continue"
          handleButtonClick={handleContinueButtonClick}
          handleChange={handlePasswordChange}
          isLoading={isLoadingPasswordCheck}
          label="Current password"
          type="password"
          value={password}
          validationError={errorMessage !== ''}
          validationMessage={errorMessage}
        />
      )}
      {showForms && isCorrectPassword && (
        <PasswordAndConfirmationForm
          buttonLabel="Update"
          handleButtonClick={handleUpdateButtonClick}
          handleConfirmationChange={handleConfirmationChange}
          handlePasswordChange={handlePasswordChangeWithValidation}
          isLoading={isLoadingPasswordUpdate}
          mismatch={passwordMismatch}
          passwordLabel="New password"
          validationMessage={passwordValidationMessage}
        />
      )}
      {updateButtonClicked && !isLoadingPasswordUpdate && (
        <PasswordUpdateResult successed={!isPasswordUpdateError} />
      )}
    </Stack>
  )
}
