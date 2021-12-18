import type { NextPage } from 'next'
import type { HeaderProps } from 'components/organisms/container'
import { Account } from 'components/templates'

const MenusPage: NextPage<HeaderProps> = (props) => {
  return <Account {...props} />
}

export default MenusPage
