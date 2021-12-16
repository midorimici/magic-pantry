import { Meta, PageTitle } from 'components/atoms'
import { Container, HeaderProps } from 'components/organisms/container'

export const Account: React.FC<HeaderProps> = (props) => {
  return (
    <>
      <Meta title="🔧 Account Settings" />
      <Container {...props}>
        <PageTitle title="🔧 Account Settings" />
      </Container>
    </>
  )
}
