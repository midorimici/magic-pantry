import { RecoilRoot } from 'recoil'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material'
import { lightGreen } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: lightGreen[700],
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default MyApp
