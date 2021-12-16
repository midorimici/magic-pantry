import type { NextPage } from 'next'
import type { HeaderProps } from 'components/organisms/container'
import { Menus } from 'components/templates'

const MenusPage: NextPage<HeaderProps> = (props) => {
  return <Menus {...props} />
}

export default MenusPage
