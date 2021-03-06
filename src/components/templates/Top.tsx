import { Meta, PageTitle, TopAnimation, TopDescription } from 'components/atoms'
import { Container, HeaderProps } from 'components/organisms/container'

export const Top: React.FC<HeaderProps> = (props) => {
  return (
    <>
      <Meta title="" />
      <Container {...props}>
        <PageTitle title="Magic Pantry" />
        <TopAnimation />
        <TopDescription />
      </Container>
    </>
  )
}
