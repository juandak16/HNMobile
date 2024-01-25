import {ReactNode, createContext, useContext, useEffect, useState} from 'react'
import {Theme, friendlyColors, hackColors} from 'src/data/local/theme'

interface ThemeContextProps {
  colors: Theme
  toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const [isHackMode, setIsHackMode] = useState(false)
  const [colors, setColors] = useState(friendlyColors)

  useEffect(() => {
    if (isHackMode) {
      setColors(hackColors)
    } else {
      setColors(friendlyColors)
    }
  }, [isHackMode])

  const toggleDarkMode = (): void => {
    setIsHackMode(prev => !prev)
  }

  const theme: ThemeContextProps = {
    colors,
    toggleDarkMode,
  }

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
