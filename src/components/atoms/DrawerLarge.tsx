import { Drawer } from '@mui/material'

type Props = {
  children: React.ReactNode
}

const drawerWidth = 480

export const DrawerLarge: React.FC<Props> = ({ children }) => {
  return (
    <Drawer
      anchor="right"
      open
      variant="permanent"
      sx={{
        display: { xs: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'block' },
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          zIndex: (theme) => theme.zIndex.appBar - 1,
        },
      }}
    >
      {children}
    </Drawer>
  )
}
