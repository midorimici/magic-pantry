import { Meta, PageTitle, TopDescription } from 'components/atoms'
import { Container, HeaderProps } from 'components/molecules'

export const Top: React.FC<HeaderProps> = (props) => {
  return (
    <>
      <Meta title="" />
      <Container {...props}>
        <PageTitle title="Magic Pantry" />
        <TopDescription />
      </Container>
    </>
  )
}
