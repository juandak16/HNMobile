import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {enableScreens} from 'react-native-screens'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {ThemeProvider} from 'src/domain/context/ThemeContext'
import Navigation from 'src/presentation/navigation/Navigation'

enableScreens()

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </GestureHandlerRootView>
    </ThemeProvider>
  )
}

export default App
