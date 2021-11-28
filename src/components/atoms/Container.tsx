import { Box, Container } from '@mui/material'

export const Cont: React.FC = ({ children }) => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ minHeight: '100vh', py: 4 }}>{children}</Box>
    </Container>
  )
}
