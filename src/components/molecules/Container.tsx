import { Box, Container } from '@mui/material'
import { Header, HeaderProps } from 'components/molecules'

export const Cont: React.FC<HeaderProps> = ({ children, ...props }) => {
  return (
    <>
      <Header {...props} />
      <Container maxWidth="sm">
        <Box sx={{ minHeight: '90vh', py: 4 }}>{children}</Box>
      </Container>
    </>
  )
}
