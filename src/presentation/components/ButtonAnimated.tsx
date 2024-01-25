import {Animated, ViewStyle, StyleSheet} from 'react-native'
import React from 'react'
import {RectButton} from 'react-native-gesture-handler'
import {useTheme} from 'src/domain/context/ThemeContext'

type ButtonProps = {
  onPress: () => void
  dragX: Animated.AnimatedInterpolation<number | string>
  progress?: Animated.AnimatedInterpolation<number | string>
  children: React.ReactNode
  direction: 'left' | 'right'
}

export default function ButtonAnimated({onPress, dragX, progress, children, direction}: ButtonProps) {
  const {colors} = useTheme()
  const styles = StyleSheet.create({
    button: {
      flex: 1,
      padding: 15,
      width: '100%',
      backgroundColor: colors.buttonBackground,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      padding: 0,
      width: '100%',
      color: colors.buttonText,
      fontSize: 12,
    },
  })
  const opacityStyle: Animated.WithAnimatedValue<ViewStyle> = {
    opacity: progress ? progress : 1,
  }

  const trans = dragX.interpolate({
    inputRange: direction === 'left' ? [-100, 0] : [0, 100],
    outputRange: [0, 0],
  })

  const transformStyle: Animated.WithAnimatedValue<ViewStyle> = {
    transform: [{translateX: trans}],
  }

  return (
    <Animated.View style={[transformStyle, opacityStyle]}>
      <RectButton onPress={onPress} style={styles.button}>
        <Animated.Text style={styles.text}>{children}</Animated.Text>
      </RectButton>
    </Animated.View>
  )
}
