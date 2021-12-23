import { RecoilRoot, useRecoilValue } from 'recoil'
import 'styles/globals.css'
import type { NextComponentType, NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { createTheme, ThemeProvider } from '@mui/material'
import { lightGreen } from '@mui/material/colors'
import type { HeaderProps } from 'components/organisms/container'
import { useAuthState, useSignOutHandler } from 'hooks'
import { authUserState } from 'states/auth/atom'
import { useEffect } from 'react'

const theme = createTheme({
  palette: {
    primary: {
      main: lightGreen[700],
    },
  },
})

type PageContainerProps = {
  component: NextComponentType<NextPageContext, any, HeaderProps>
}

const PageContainer: React.FC<PageContainerProps> = ({ component: Component }) => {
  const user = useRecoilValue(authUserState)
  const { isLoading, handleSignOut } = useSignOutHandler()
  const { isLoadingAuthState } = useAuthState()
  const router = useRouter()

  useEffect(() => {
    const path = router.pathname
    if (user === null) {
      // When user is not signed in
      if (!isLoading && !isLoadingAuthState && path !== '/' && path !== '/sign-in') {
        router.push('/sign-in')
      }
    } else {
      // When user is signed in
      if (user.emailVerified) {
        // When user email is verified
        if (path === '/sign-in' || path === '/email-verification') {
          setTimeout(() => router.push('/pantry'), 1000)
        }
      } else {
        // When user email is not verified
        if (path !== '/' && path !== '/email-verification') {
          router.push('/email-verification')
        }
      }
    }
  }, [isLoading, isLoadingAuthState, user, router])

  return (
    <Component
      isLoading={isLoading || isLoadingAuthState}
      isLoggedIn={user !== null}
      handleSignOutButtonClick={handleSignOut}
    />
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <PageContainer component={Component} {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default MyApp
