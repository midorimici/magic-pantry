import { Stack, Typography } from '@mui/material'
import { ContinueWithGoogleButton } from './ContinueWithGoogleButton'
import { EmailPasswordForm } from './EmailPasswordForm'

export const SignInForm: React.FC = () => {
  return (
    <Stack alignItems="center" gap={2}>
      <ContinueWithGoogleButton />
      <Typography>or</Typography>
      <EmailPasswordForm />
    </Stack>
  )
}
