import React from 'react'
import {render, fireEvent} from '@testing-library/react-native'
import {ThemeProvider, useTheme} from 'src/domain/context/ThemeContext'
import {Button, Text, View} from 'react-native'
import {friendlyColors, hackColors} from 'src/data/local/theme'

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

    const colorsText = getByTestId('colors').props.children
    expect(colorsText).toBe(JSON.stringify(friendlyColors))

    const toggleDarkModeButton = getByTestId('toggleDarkModeButton')
    expect(toggleDarkModeButton).toBeTruthy()
  })

  it('toggles theme when Toggle Dark Mode button is pressed', () => {
    const {getByTestId} = render(
      <ThemeProvider>
        <MockChildComponent />
      </ThemeProvider>,
    )

    const initialColorsText = getByTestId('colors').props.children
    expect(initialColorsText).toBe(JSON.stringify(friendlyColors))

    fireEvent.press(getByTestId('toggleDarkModeButton'))

    const updatedColorsText = getByTestId('colors').props.children
    expect(updatedColorsText).toBe(JSON.stringify(hackColors))
  })
})
