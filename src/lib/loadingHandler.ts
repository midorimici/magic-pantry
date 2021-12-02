export const loadingHandler = async (
  setIsLoading: (isLoading: boolean) => void,
  func: () => Promise<void>
) => {
  setIsLoading(true)

  await func()

  setIsLoading(false)
}
