import Link from 'next/link'
import { Button, Typography } from '@mui/material'

export type HeaderContentsProps = {
  /** User is logging in */
  isLoggedIn: boolean
  /** Process when sign out button clicked */
  handleSignOutButtonClick: () => void
}

export const HeaderContents: React.FC<HeaderContentsProps> = ({
  isLoggedIn,
  handleSignOutButtonClick,
}) => {
  if (isLoggedIn) {
    return (
      <>
        <Typography variant="button">
          <Link href="/pantry">Pantry</Link>
        </Typography>
        <Typography variant="button">
          <Link href="/menus">Menus</Link>
        </Typography>
        <Button onClick={handleSignOutButtonClick} sx={{ color: 'white' }}>
          Sign out
        </Button>
      </>
    )
  }

  return (
    <Typography variant="button">
      <Link href="/sign-in">Sign In</Link>
    </Typography>
  )
}
