import { useEffect, useState } from 'react'

const getMatches = (query: string): boolean => {
  return window?.matchMedia(query).matches || false // Prevents SSR issues
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(getMatches(query))

  function handleChange() {
    setMatches(getMatches(query))
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange() // Triggered at the first client-side load and if query changes
    matchMedia.addEventListener('change', handleChange) // Listen matchMedia
    return () => matchMedia.removeEventListener('change', handleChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return matches
}

export default useMediaQuery
