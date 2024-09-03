'use client'

import { useEffect } from 'react'
import useColorModeState from '../stores/colorMode'

const ThemeDetector = () => {
  const { setColorMode } = useColorModeState()

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      setColorMode(e.matches ? 'dark' : 'light')
    }

    setColorMode(mediaQuery.matches ? 'dark' : 'light')

    mediaQuery.addListener(handleChange)

    return () => mediaQuery.removeListener(handleChange)
  }, [setColorMode])

  return null
}

export default ThemeDetector