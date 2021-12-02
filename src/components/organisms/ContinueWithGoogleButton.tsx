import { CircularProgress } from '@mui/material'
import GoogleButton from 'react-google-button'
import { useGoogleSignIn } from 'hooks'

export const ContinueWithGoogleButton: React.FC = () => {
  const { isLoading, googleSignIn } = useGoogleSignIn()

  if (isLoading) {
    return <CircularProgress aria-busy aria-describedby="sign in with google" />
  }

  return <GoogleButton label="Continue with Google" type="light" onClick={googleSignIn} />
}
