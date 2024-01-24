import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import NewsListScreen from 'src/presentation/screens/NewsList'
import NewsDetailScreen from 'src/presentation/screens/NewsDetail'
import {useTheme} from 'src/domain/context/ThemeContext'
import Icon from 'react-native-vector-icons/FontAwesome6'

export type StackParamList = {
  NewsList: undefined
  NewsDetail: {
    url: string
  }
}

const Stack = createNativeStackNavigator<StackParamList>()

export default function Navigation() {
  const {colors, toggleDarkMode} = useTheme()
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NewsList"
        component={NewsListScreen}
        options={{
          title: 'News',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.primaryText,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerRight: () => <Icon name="ghost" color={colors.secondary} size={20} onPress={() => toggleDarkMode()} />,
        }}
      />
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetailScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.primaryText,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  )
}
