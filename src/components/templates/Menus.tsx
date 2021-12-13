import { Meta, PageTitle } from 'components/atoms'
import { Container, HeaderProps } from 'components/molecules'
import { RecipeBoard } from 'components/organisms/menus'

export const Menus: React.FC<HeaderProps> = (props) => {
  return (
    <>
      <Meta title="🥘 Menus" />
      <Container {...props}>
        <PageTitle title="🥘 Menus" />
        <RecipeBoard />
      </Container>
    </>
  )
}
