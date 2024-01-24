import React from 'react'
import {render, fireEvent} from '@testing-library/react-native'
import {ThemeProvider, useTheme} from 'src/domain/context/ThemeContext'
import {Button, Text, View} from 'react-native'
import {friendlyColors, hackColors} from 'src/data/local/theme'

// Mock de children para ThemeProvider
const MockChildComponent: React.FC = () => {
  const {colors, toggleDarkMode} = useTheme()
  return (
    <View>
      <Text testID="colors">{JSON.stringify(colors)}</Text>
      <Button onPress={toggleDarkMode} testID="toggleDarkModeButton" title="Toggle Dark Mode" />
    </View>
  )
}

describe('ThemeProvider', () => {
  it('renders children with default theme', () => {
    const {getByTestId} = render(
      <ThemeProvider>
        <MockChildComponent />
      </ThemeProvider>,
    )

    // Verificar que los colores predeterminados se renderizan correctamente
    const colorsText = getByTestId('colors').props.children
    expect(colorsText).toBe(JSON.stringify(friendlyColors))

    // Verificar que el botón de alternar modo oscuro está presente
    const toggleDarkModeButton = getByTestId('toggleDarkModeButton')
    expect(toggleDarkModeButton).toBeTruthy()
  })

  it('toggles theme when Toggle Dark Mode button is pressed', () => {
    const {getByTestId} = render(
      <ThemeProvider>
        <MockChildComponent />
      </ThemeProvider>,
    )

    // Verificar que los colores predeterminados se renderizan inicialmente
    const initialColorsText = getByTestId('colors').props.children
    expect(initialColorsText).toBe(JSON.stringify(friendlyColors))

    // Presionar el botón de alternar modo oscuro
    fireEvent.press(getByTestId('toggleDarkModeButton'))

    // Verificar que los colores se han cambiado a hackColors después de presionar el botón
    const updatedColorsText = getByTestId('colors').props.children
    expect(updatedColorsText).toBe(JSON.stringify(hackColors))
  })
})
