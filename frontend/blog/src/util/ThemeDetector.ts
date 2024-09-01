'use client'

import { useEffect } from 'react'
import useDarkModeState from '../stores/darkmode'

const ThemeDetector = () => {
  const { setIsDark } = useDarkModeState()

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches)
    }

    setIsDark(mediaQuery.matches)

    mediaQuery.addListener(handleChange)

    return () => mediaQuery.removeListener(handleChange)
  }, [setIsDark])

  return null
}

export default ThemeDetector