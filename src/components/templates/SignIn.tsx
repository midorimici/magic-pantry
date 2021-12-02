import { Container, HeaderProps } from 'components/molecules'
import { SignInForm } from 'components/organisms'

export const SignIn: React.FC<HeaderProps> = (props) => {
  return (
    <Container {...props}>
      <SignInForm />
    </Container>
  )
}
