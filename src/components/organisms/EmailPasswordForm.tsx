import { useRef } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { useEmailPasswordAuth } from './hooks'
import { PasswordAndConfirmationForm, SingleLineForm } from 'components/molecules'

export const EmailPasswordForm: React.FC = () => {
  const emailRef = useRef<HTMLTextAreaElement>(null)
  const {
    email,
    emailIsValid,
    validationError,
    isLoading,
    showPasswordAndConfirmationForm,
    showPasswordForm,
    password,
    passwordValidationMessage,
    passwordMismatch,
    errorMessage,
    handleEmailChange,
    handleContinueWithEmailButtonClick,
    handleChangeEmailButtonClick,
    handlePasswordChange,
    handlePasswordChangeWithValidation,
    handleConfirmationChange,
    handleSignInButtonClick,
    handleSignUpButtonClick,
  } = useEmailPasswordAuth(emailRef)

  const message = `Sign ${showPasswordAndConfirmationForm ? 'up' : 'in'} with ${email}`

  return (
    <Stack alignSelf="stretch" gap={2}>
      {showPasswordAndConfirmationForm || showPasswordForm ? (
        <Stack alignItems="center" direction="row" justifyContent="space-between">
          <Typography>{message}</Typography>
          <Button onClick={handleChangeEmailButtonClick}>Change email</Button>
        </Stack>
      ) : (
        <SingleLineForm
          buttonDisabled={!emailIsValid}
          buttonLabel="Continue"
          handleButtonClick={handleContinueWithEmailButtonClick}
          handleChange={handleEmailChange}
          isLoading={isLoading}
          ref={emailRef}
          type="email"
          validationError={validationError}
          validationMessage={emailRef.current?.validationMessage}
          value={email}
        />
      )}
      {showPasswordAndConfirmationForm && (
        <PasswordAndConfirmationForm
          buttonLabel="Sign Up"
          handleButtonClick={handleSignUpButtonClick}
          handleConfirmationChange={handleConfirmationChange}
          handlePasswordChange={handlePasswordChangeWithValidation}
          isLoading={isLoading}
          mismatch={passwordMismatch}
          validationMessage={passwordValidationMessage}
        />
      )}
      {showPasswordForm && (
        <SingleLineForm
          buttonDisabled={password === ''}
          buttonLabel="Sign In"
          handleButtonClick={handleSignInButtonClick}
          handleChange={handlePasswordChange}
          isLoading={isLoading}
          type="password"
          value={password}
        />
      )}
      {errorMessage && <Typography color="red">{errorMessage}</Typography>}
    </Stack>
  )
}
