import { NextPage } from 'next'
import Link from 'next/link'
import { Meta, PageTitle } from 'components/atoms'
import { Container, HeaderProps } from 'components/molecules'

const NotFound: NextPage<HeaderProps> = (props) => {
  return (
    <>
      <Meta title="😔 404 - Not Found" />
      <Container {...props}>
        <PageTitle title="😔 404 - Not Found" />
        <Link href="/">→ Back to home</Link>
      </Container>
    </>
  )
}

export default NotFound
