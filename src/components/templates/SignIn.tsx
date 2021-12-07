import { Meta } from 'components/atoms'
import { Container, HeaderProps } from 'components/molecules'
import { SignInForm } from 'components/organisms/sign-in'

export const SignIn: React.FC<HeaderProps> = (props) => {
  return (
    <>
      <Meta title="Sign In" />
      <Container {...props}>
        <SignInForm />
      </Container>
    </>
  )
}
