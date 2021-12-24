import { Meta, PageTitle } from 'components/atoms'
import { Container, HeaderProps } from 'components/organisms/container'
import { VerifyEmailForm } from 'components/organisms/email-verification'

export const EmailVerification: React.FC<HeaderProps> = (props) => {
  return (
    <>
      <Meta title="📧 Email Verification" />
      <Container {...props}>
        <PageTitle title="📧 Email Verification" />
        <VerifyEmailForm />
      </Container>
    </>
  )
}
