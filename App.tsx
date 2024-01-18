/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Label from 'src/presentation/components/Label'
import React from 'react'
import {SafeAreaView, StyleSheet, Text, useColorScheme} from 'react-native'

import {Colors} from 'react-native/Libraries/NewAppScreen'

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  return (
    <SafeAreaView style={{...backgroundStyle, ...styles.content}}>
      <Text>Hello world</Text>
      <Label />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default App
