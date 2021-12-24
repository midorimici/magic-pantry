import { Container, Stack } from '@mui/material'
import { Footer } from 'components/atoms'
import { Header, HeaderProps } from './Header'

export const Cont: React.FC<HeaderProps> = ({ children, ...props }) => {
  return (
    <Stack gap={4} sx={{ minHeight: '100vh' }}>
      <Header {...props} />
      <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {children}
      </Container>
      <Footer />
    </Stack>
  )
}
