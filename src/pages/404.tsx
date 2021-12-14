import { NextPage } from 'next'
import NextLink from 'next/link'
import { Link } from '@mui/material'
import { Meta, PageTitle } from 'components/atoms'
import { Container, HeaderProps } from 'components/molecules'

const NotFound: NextPage<HeaderProps> = (props) => {
  return (
    <>
      <Meta title="😔 404 - Not Found" />
      <Container {...props}>
        <PageTitle title="😔 404 - Not Found" />
        <NextLink href="/" passHref>
          <Link>→ Back to home</Link>
        </NextLink>
      </Container>
    </>
  )
}

export default NotFound
