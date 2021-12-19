import { Drawer } from '@mui/material'

type Props = {
  open: boolean
  onCloseDrawer: () => void
  children: React.ReactNode
}

const drawerWidth = { xs: 240, sm: 480, md: 480 }

export const DrawerSmall: React.FC<Props> = ({ open, onCloseDrawer, children }) => {
  return (
    <Drawer
      anchor="right"
      ModalProps={{
        disableScrollLock: true,
        keepMounted: true,
      }}
      open={open}
      variant="temporary"
      onClose={onCloseDrawer}
      sx={{
        display: { xs: 'block', sm: 'block', md: 'block', lg: 'none', xl: 'none' },
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
