import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Button, Divider, Link, Menu, MenuItem, Typography } from '@mui/material'
import { useAccountMenuHandlers } from './hooks'

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

  const { anchorEl, handleAccountButtonClick, handleCloseMenu } = useAccountMenuHandlers()

  const AccountMenu = () => {
    return (
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'account-button',
        }}
      >
        <MenuItem>
          <NextLink href="/account" passHref>
            <Link color="inherit" underline="none">
              Account settings
            </Link>
          </NextLink>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSignOutButtonClick} sx={{ color: 'secondary.main' }}>
          Sign out
        </MenuItem>
      </Menu>
    )
  }

  if (isLoggedIn) {
    return (
      <>
        <Typography variant="button" sx={router.pathname === '/pantry' ? style : undefined}>
          <NextLink href="/pantry">
            <a>Pantry</a>
          </NextLink>
        </Typography>
        <Typography variant="button" sx={router.pathname === '/menus' ? style : undefined}>
          <NextLink href="/menus">
            <a>Menus</a>
          </NextLink>
        </Typography>
        <Button
          id="account-button"
          aria-controls="account-menu"
          aria-haspopup
          aria-expanded={!!anchorEl ? true : undefined}
          onClick={handleAccountButtonClick}
          sx={{ color: 'white' }}
        >
          Account
        </Button>
        <AccountMenu />
      </>
    )
  }

  return (
    <Typography variant="button">
      <NextLink href="/sign-in">
        <a>Sign In</a>
      </NextLink>
    </Typography>
  )
}
