import { PersonRemove } from '@mui/icons-material'
import { Button, CircularProgress, Stack, Typography } from '@mui/material'
import { SingleLineForm } from 'components/molecules'
import { usePasswordHandlers } from 'hooks'
import { useDeleteAccount, useFormHandlers, usePasswordAuth, useSignInMethod } from './hooks'

export const DeleteAccountButton: React.FC = () => {
  const {
    isLoading: isLoadingSignInMethod,
    isError: isSignInMethodError,
    isEmailPasswordAuth,
  } = useSignInMethod()

  const { showForms, handleShowForms } = useFormHandlers()

  const { password, handlePasswordChange } = usePasswordHandlers()

  const {
    isLoading: isLoadingPasswordCheck,
    isCorrectPassword,
    errorMessage,
    handleContinueButtonClick,
  } = usePasswordAuth(password)

  const {
    isLoading: isLoadingDeleteAccount,
    isError,
    isFinished,
    deleteAccount,
  } = useDeleteAccount(isCorrectPassword)

  const handleDeleteButtonClick = isEmailPasswordAuth ? handleShowForms : deleteAccount

  const StateShower = () => {
    if (isLoadingPasswordCheck) {
      return <Typography>Checking for password ...</Typography>
    }

    if (isLoadingDeleteAccount) {
      return <Typography>Deleting account ...</Typography>
    }

    if (isError) {
      return <Typography color="red">Failed to delete account. Some error occured.</Typography>
    }

    if (isFinished) {
      return <Typography>👋 Goodbye!</Typography>
    }

    return null
  }

  if (isLoadingSignInMethod) {
    return <CircularProgress aria-busy aria-describedby="loading-sign-in-method" />
  }

  if (isSignInMethodError) {
    return <Typography color="red">Some error occured. Please try again later.</Typography>
  }

  return (
    <>
      {showForms ? (
        <Stack gap={4}>
          <Stack alignItems="center" direction="row" gap={2}>
            <PersonRemove color="warning" />
            <Typography>Delete account</Typography>
          </Stack>
          <Typography>
            If you are sure to delete your account, please type your current password below.
          </Typography>
          <SingleLineForm
            buttonDisabled={password === ''}
            buttonLabel="Delete account"
            handleButtonClick={handleContinueButtonClick}
            handleChange={handlePasswordChange}
            isLoading={isLoadingPasswordCheck || isLoadingDeleteAccount}
            type="password"
            value={password}
            validationError={errorMessage !== ''}
            validationMessage={errorMessage}
          />
          <StateShower />
        </Stack>
      ) : (
        <Button color="warning" variant="contained" onClick={handleDeleteButtonClick}>
          Delete account
        </Button>
      )}
    </>
  )
}
