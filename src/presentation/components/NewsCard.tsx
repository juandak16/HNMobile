import {View, Text, StyleSheet, Animated} from 'react-native'
import React from 'react'
import {FormattedNews} from 'src/domain/getNewsFormatted'
import {NewsListScreenNavigationProp} from '../screens/NewsList'
import {RectButton, Swipeable} from 'react-native-gesture-handler'
import ButtonAnimated from './ButtonAnimated'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {useTheme} from 'src/domain/context/ThemeContext'

dayjs.extend(relativeTime)

type Props = {
  item: FormattedNews
  navigation: NewsListScreenNavigationProp
  onDelete: (id: number) => void
}
export default function NewsCard({item, navigation, onDelete}: Props) {
  const {colors} = useTheme()
  const styles = StyleSheet.create({
    card: {
      margin: 0,
      backgroundColor: colors.primary,
    },
    cardContent: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.secondary,
    },
    title: {
      color: colors.primaryText,
      paddingBottom: 10,
      fontSize: 16,
    },
    info: {
      color: colors.secondaryText,
      fontSize: 12,
    },
  })
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<string | number>,
    dragX: Animated.AnimatedInterpolation<string | number>,
  ) => {
    return (
      <ButtonAnimated dragX={dragX} progress={progress} onPress={() => onDelete(item.id)} direction="right">
        Delete
      </ButtonAnimated>
    )
  }
  return (
    <Swipeable friction={2} renderRightActions={renderRightActions} testID="news-card">
      <RectButton
        style={styles.card}
        onPress={() => navigation.navigate('NewsDetail', {url: item.url})}
        testID="news-card-button">
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.info}>
            {item.author}-{dayjs(item.created_at).fromNow()}
          </Text>
        </View>
      </RectButton>
    </Swipeable>
  )
}
