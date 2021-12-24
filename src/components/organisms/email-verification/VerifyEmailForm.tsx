import { Check } from '@mui/icons-material'
import { Button, CircularProgress, Grow, Stack, Typography } from '@mui/material'
import { useEmailVerification } from './hooks'

export const VerifyEmailForm: React.FC = () => {
  const { isVerified, isSending, isError, completedSending, handleSendVerifyButtonClick } =
    useEmailVerification()

  if (isVerified) {
    return (
      <Stack alignItems="center" direction="row" gap={2}>
        <Grow in>
          <Check color="success" />
        </Grow>
        <Typography>Your email was verified.</Typography>
      </Stack>
    )
  }

  if (isError) {
    return <Typography color="red">Some error occured.</Typography>
  }

  const BottomSection = () => {
    if (isSending) {
      return <CircularProgress aria-busy aria-describedby="email-verification" />
    } else if (completedSending) {
      return <Typography>Verification email was sent. Please check for your email.</Typography>
    } else {
      return (
        <Button variant="contained" onClick={handleSendVerifyButtonClick}>
          Verify email
        </Button>
      )
    }
  }

  return (
    <Stack gap={2}>
      <Typography>In order to use the service, you have to verify your email.</Typography>
      <BottomSection />
    </Stack>
  )
}
