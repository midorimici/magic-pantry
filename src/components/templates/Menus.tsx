import { Stack } from '@mui/material'
import { Meta, PageTitle, SpoonacularBacklink } from 'components/atoms'
import { Container, HeaderProps } from 'components/molecules'
import { RecipeBoard } from 'components/organisms/menus'

export const Menus: React.FC<HeaderProps> = (props) => {
  return (
    <>
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
    </>
  )
}
