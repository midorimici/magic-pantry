import { Box, Container } from '@mui/material'
import { Header, HeaderProps } from './Header'

export const Cont: React.FC<HeaderProps> = ({ children, ...props }) => {
  return (
    <>
      <Header {...props} />
      <Container maxWidth="md">
        <Box sx={{ minHeight: '90vh', py: 4 }}>{children}</Box>
      </Container>
    </>
  )
}
