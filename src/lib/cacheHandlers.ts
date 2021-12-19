const cacheDuration = 60 * 60 * 1000

export const getCache = (
  key: string,
  onCacheAvailable: (data: any) => void,
  onCacheUnavailable: () => void
) => {
  const cache = localStorage.getItem(key)
  if (cache) {
    const cacheData = JSON.parse(cache)
    if (cacheData['expires'] > Date.now()) {
      onCacheAvailable(cacheData['data'])
      return
    }
  }
  onCacheUnavailable()
}

export const setCache = (key: string, data: any) => {
  const expires = Date.now() + cacheDuration
  localStorage.setItem(key, JSON.stringify({ data, expires }))
}

export const clearCache = () => {
  const storage = localStorage
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i)
    if (key && /^magic-pantry\/(?:recipes|findByIngredients)\//.test(key)) {
      const data = storage.getItem(key)
      if (data && JSON.parse(data)['expires'] < Date.now()) {
        storage.removeItem(key)
      }
    }
  }
}
