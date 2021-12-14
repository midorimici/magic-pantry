import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Typography } from '@mui/material'

export type HeaderContentsProps = {
  /** User is logging in */
  isLoggedIn: boolean
  /** Process when sign out button clicked */
  handleSignOutButtonClick: () => void
}

const style = {
  borderBottom: 'solid 2px',
}

export const HeaderContents: React.FC<HeaderContentsProps> = ({
  isLoggedIn,
  handleSignOutButtonClick,
}) => {
  const router = useRouter()

  if (isLoggedIn) {
    return (
      <>
        <Typography variant="button" sx={router.pathname === '/pantry' ? style : undefined}>
          <Link href="/pantry">
            <a>Pantry</a>
          </Link>
        </Typography>
        <Typography variant="button" sx={router.pathname === '/menus' ? style : undefined}>
          <Link href="/menus">
            <a>Menus</a>
          </Link>
        </Typography>
        <Button onClick={handleSignOutButtonClick} sx={{ color: 'white' }}>
          Sign out
        </Button>
      </>
    )
  }

  return (
    <Typography variant="button">
      <Link href="/sign-in">
        <a>Sign In</a>
      </Link>
    </Typography>
  )
}
