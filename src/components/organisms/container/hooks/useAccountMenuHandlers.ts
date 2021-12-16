import { useState } from 'react'

export const useAccountMenuHandlers = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleAccountButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return { anchorEl, handleAccountButtonClick, handleCloseMenu }
}
