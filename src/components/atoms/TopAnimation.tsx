import { Box } from '@mui/material'
import Image from 'next/image'

export const TopAnimation: React.FC = () => {
  return (
    <Box textAlign="center">
      <Image alt="animation" height={310} src="/brand-animation.gif" width={360} />
    </Box>
  )
}
