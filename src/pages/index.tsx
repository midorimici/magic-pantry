import type { NextPage } from 'next'
import type { HeaderProps } from 'components/organisms/container'
import { Top } from 'components/templates'

const Home: NextPage<HeaderProps> = (props) => {
  return <Top {...props} />
}

export default Home
