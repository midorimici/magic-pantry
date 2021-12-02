import { AppBar, Skeleton, Toolbar } from '@mui/material'
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
      <Toolbar sx={{ justifyContent: 'flex-end', gap: 4 }}>
        {isLoading ? (
          <Skeleton width="20%" sx={{ bgcolor: 'primary.light' }} />
        ) : (
          <HeaderContents
            isLoggedIn={isLoggedIn}
            handleSignOutButtonClick={handleSignOutButtonClick}
          />
        )}
      </Toolbar>
    </AppBar>
  )
}
