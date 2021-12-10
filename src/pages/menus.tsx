import type { NextPage } from 'next'
import type { HeaderProps } from 'components/molecules'
import { Menus } from 'components/templates'

const MenusPage: NextPage<HeaderProps> = (props) => {
  return <Menus {...props} />
}

export default MenusPage
