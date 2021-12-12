import { Typography } from '@mui/material'

type Props = {
  title: string
}

export const PageTitle: React.FC<Props> = ({ title }) => {
  return (
    <Typography gutterBottom variant="h4">
      {title}
    </Typography>
  )
}
