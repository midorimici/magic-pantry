import type { NextPage } from 'next'
import type { HeaderProps } from 'components/organisms/container'
import { SignIn } from 'components/templates'

const SignInPage: NextPage<HeaderProps> = (props) => {
  return <SignIn {...props} />
}

export default SignInPage
