export const useCardClickEventHandler = (
  setVisibleEditDialogId: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const handleCardClick = (id: string) => {
    setVisibleEditDialogId(id)
  }

  return { handleCardClick }
}
