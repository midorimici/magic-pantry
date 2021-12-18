import { Box, Stack } from '@mui/material'
import { Meta, PageTitle, SpoonacularBacklink } from 'components/atoms'
import { Container, HeaderProps } from 'components/organisms/container'
import { RecipeBoard } from 'components/organisms/menus'

export const Menus: React.FC<HeaderProps> = (props) => {
  return (
    <Box sx={{ '.MuiContainer-root': { ml: { lg: 4, xl: 16 } } }}>
      <Meta title="🥘 Menus" />
      <Container {...props}>
        <Stack
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
        >
          <PageTitle title="🥘 Menus" />
          <SpoonacularBacklink />
        </Stack>
        <RecipeBoard />
      </Container>
    </Box>
  )
}
