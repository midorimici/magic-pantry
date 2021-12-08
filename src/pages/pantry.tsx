import type { NextPage } from 'next'
import type { HeaderProps } from 'components/molecules'
import { Pantry } from 'components/templates'

const PantryPage: NextPage<HeaderProps> = (props) => {
  return <Pantry {...props} />
}

export default PantryPage
