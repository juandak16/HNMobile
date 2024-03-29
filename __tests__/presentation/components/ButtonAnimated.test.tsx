import React from 'react'
import {render, fireEvent} from '@testing-library/react-native'
import {Animated} from 'react-native'
import {useTheme} from 'src/domain/context/ThemeContext'
import ButtonAnimated from 'src/presentation/components/ButtonAnimated'

jest.mock('src/domain/context/ThemeContext')
jest.mock('react-native-gesture-handler', () => ({
  RectButton: jest.fn(({children, onPress}) => <button onClick={onPress}>{children}</button>),
}))

describe('ButtonAnimated', () => {
  beforeEach(() => {
    ;(useTheme as jest.Mock).mockReturnValue({
      colors: {
        buttonBackground: '#ed5c53',
        buttonText: '#FFFFFF',
      },
    })
  })

  it('renders correctly', () => {
    const onPressMock = jest.fn()
    const dragXMock = new Animated.Value(0)

    const {getByText, toJSON} = render(
      <ButtonAnimated onPress={onPressMock} dragX={dragXMock} direction="left">
        Test Button
      </ButtonAnimated>,
    )

    expect(getByText('Test Button')).toBeTruthy()
    expect(toJSON()).toMatchSnapshot()
  })

  it('calls onPress function on button press', () => {
    const onPressMock = jest.fn()
    const dragXMock = new Animated.Value(0)

    const {getByText} = render(
      <ButtonAnimated onPress={onPressMock} dragX={dragXMock} direction="left">
        Test Button
      </ButtonAnimated>,
    )
    fireEvent.press(getByText('Test Button'))

    expect(onPressMock).toHaveBeenCalled()
  })
})
