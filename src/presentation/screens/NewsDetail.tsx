import {RouteProp} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import React, {useState} from 'react'
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native'
import {WebView} from 'react-native-webview'
import {StackParamList} from '../navigation/Navigation'
import {useTheme} from 'src/domain/context/ThemeContext'

export type NewsDetailScreenRouteProp = RouteProp<StackParamList, 'NewsDetail'>
type NewsDetailScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'NewsDetail'>

type Props = {
  route: NewsDetailScreenRouteProp
  navigation: NewsDetailScreenNavigationProp
}

export default function NewsDetail({route}: Props) {
  const {colors} = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const url = route.params?.url

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
    },
    loader: {
      zIndex: 1,
    },
    webView: {
      flex: 1,
    },
  })

  if (!url) {
    return null
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container} testID="web-view">
        {isLoading ? (
          <ActivityIndicator size="large" style={styles.loader} color={colors.secondary} />
        ) : (
          <WebView
            style={styles.webView}
            source={{uri: url}}
            originWhitelist={['*']}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
          />
        )}
      </View>
    </SafeAreaView>
  )
}
