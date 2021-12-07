import { Fab } from '@mui/material'
import { Add } from '@mui/icons-material'

type Props = {
  onClick: () => void
}

export const AddFab: React.FC<Props> = ({ onClick }) => {
  return (
    <Fab
      color="primary"
      aria-label="add ingredient"
      sx={{ position: 'absolute', bottom: '2rem', right: '2rem' }}
      onClick={onClick}
    >
      <Add />
    </Fab>
  )
}
