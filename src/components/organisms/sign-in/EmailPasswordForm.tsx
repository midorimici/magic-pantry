import { useRef } from 'react'
import { Button, CircularProgress, Grow, Link, Stack, Typography } from '@mui/material'
import { Check } from '@mui/icons-material'
import { useEmailPasswordAuth, useSendPasswordResetEmailHandler } from './hooks'
import { usePasswordHandlers } from 'hooks'
import { PasswordAndConfirmationForm, SingleLineForm } from 'components/molecules'

export const EmailPasswordForm: React.FC = () => {
  const emailRef = useRef<HTMLTextAreaElement>(null)
  const {
    password,
    passwordValidationMessage,
    passwordMismatch,
    handlePasswordChange,
    handlePasswordChangeWithValidation,
    handleConfirmationChange,
  } = usePasswordHandlers()
  const {
    email,
    emailIsValid,
    validationError,
    isLoading,
    showPasswordAndConfirmationForm,
    showPasswordForm,
    errorMessage,
    handleEmailChange,
    handleContinueWithEmailButtonClick,
    handleChangeEmailButtonClick,
    handleSignInButtonClick,
    handleSignUpButtonClick,
  } = useEmailPasswordAuth(emailRef, password)
  const { isSending, finishedSending, handleSendEmailClick } = useSendPasswordResetEmailHandler()

  const message = `Sign ${showPasswordAndConfirmationForm ? 'up' : 'in'} with ${email}`

  const TopSection = () => {
    if (showPasswordAndConfirmationForm || showPasswordForm) {
      return (
        <Stack
          alignItems="center"
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
        >
          <Typography>{message}</Typography>
          <Button onClick={handleChangeEmailButtonClick}>Change email</Button>
        </Stack>
      )
    } else {
      return (
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
      )
    }
  }

  const SendPasswordResetEmailSection = () => {
    return (
      <Stack alignItems="center" direction="row" gap={2}>
        <Typography>
          {`Forgot your password? `}
          <Link
            component="button"
            underline="none"
            variant="body1"
            onClick={() => handleSendEmailClick(email)}
          >
            Send email
          </Link>
          {` to reset password.`}
        </Typography>
        {isSending && <CircularProgress aria-busy aria-describedby="Sending email" size={16} />}
        <Grow in={finishedSending}>
          <Check color="success" />
        </Grow>
      </Stack>
    )
  }

  return (
    <Stack alignSelf="stretch" gap={2}>
      <TopSection />
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
        <>
          <SingleLineForm
            buttonDisabled={password === ''}
            buttonLabel="Sign In"
            handleButtonClick={handleSignInButtonClick}
            handleChange={handlePasswordChange}
            isLoading={isLoading}
            type="password"
            value={password}
          />
          <SendPasswordResetEmailSection />
        </>
      )}
      {errorMessage && <Typography color="red">{errorMessage}</Typography>}
    </Stack>
  )
}
