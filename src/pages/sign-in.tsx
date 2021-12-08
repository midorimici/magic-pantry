import type { NextPage } from 'next'
import type { HeaderProps } from 'components/molecules'
import { SignIn } from 'components/templates'

const SignInPage: NextPage<HeaderProps> = (props) => {
  return <SignIn {...props} />
}

export default SignInPage
