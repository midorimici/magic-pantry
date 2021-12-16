import type { NextPage } from 'next'
import type { HeaderProps } from 'components/organisms/container'
import { Pantry } from 'components/templates'

const PantryPage: NextPage<HeaderProps> = (props) => {
  return <Pantry {...props} />
}

export default PantryPage
