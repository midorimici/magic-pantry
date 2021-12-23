import type { NextPage } from 'next'
import type { HeaderProps } from 'components/organisms/container'
import { EmailVerification } from 'components/templates'

const EmailVerificationPage: NextPage<HeaderProps> = (props) => {
  return <EmailVerification {...props} />
}

export default EmailVerificationPage
