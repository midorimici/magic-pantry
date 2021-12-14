import Image from 'next/image'
import Link from 'next/link'
import { AppBar, Box, Skeleton, Stack, Toolbar } from '@mui/material'
import { HeaderContents, HeaderContentsProps } from 'components/atoms'

export type HeaderProps = {
  /** User auth info is loading */
  isLoading: boolean
} & HeaderContentsProps

export const Header: React.FC<HeaderProps> = ({
  isLoading,
  isLoggedIn,
  handleSignOutButtonClick,
}) => {
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ cursor: 'pointer' }}>
          <Link href="/">
            <a>
              <Image alt="logo" height={32} src="/logo.svg" width={32} />
            </a>
          </Link>
        </Box>
        <Stack alignItems="center" direction="row" gap={{ xs: 2, sm: 4 }} justifyContent="flex-end">
          {isLoading ? (
            <Skeleton width="20%" sx={{ bgcolor: 'primary.light' }} />
          ) : (
            <HeaderContents
              isLoggedIn={isLoggedIn}
              handleSignOutButtonClick={handleSignOutButtonClick}
            />
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
