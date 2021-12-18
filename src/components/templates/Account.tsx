import { Stack } from '@mui/material'
import { Meta, PageTitle } from 'components/atoms'
import { ChangePasswordForm, DeleteAccountButton } from 'components/organisms/account'
import { Container, HeaderProps } from 'components/organisms/container'

export const Account: React.FC<HeaderProps> = (props) => {
  return (
    <>
      <Meta title="🔧 Account Settings" />
      <Container {...props}>
        <PageTitle title="🔧 Account Settings" />
        <Stack alignItems="flex-start" gap={8}>
          <ChangePasswordForm />
          <DeleteAccountButton />
        </Stack>
      </Container>
    </>
  )
}
