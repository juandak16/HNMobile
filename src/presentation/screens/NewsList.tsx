import {SafeAreaView, FlatList, StyleSheet, RefreshControl, ActivityIndicator} from 'react-native'
import React from 'react'
import NewsCard from '../components/NewsCard'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useHome} from 'src/domain/hooks/useHome'
import {StackParamList} from '../navigation/Navigation'
import {useTheme} from 'src/domain/context/ThemeContext'

export type NewsListScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'NewsList'>
type Props = {
  navigation: NewsListScreenNavigationProp
}
export default function NewsList({navigation}: Props) {
  const {colors} = useTheme()
  const {news, setDeletes, setPage, setRefreshing, refreshing} = useHome()

  const onDelete = (id: number) => {
    setDeletes(prev => [...prev, id])
  }

  const styles = StyleSheet.create({
    content: {
      width: '100%',
      display: 'flex',
      alignItems: 'flex-start',
    },
    flatListContainer: {
      width: '100%',
      minWidth: '100%',
    },
    loader: {
      backgroundColor: colors.primary,
      paddingVertical: 10,
    },
  })

  return (
    <SafeAreaView style={styles.content} testID="news-list">
      <FlatList
        data={news}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => <NewsCard item={item} navigation={navigation} onDelete={onDelete} />}
        contentContainerStyle={styles.flatListContainer}
        onEndReached={() => setPage((prevPage: number) => prevPage + 1)}
        onEndReachedThreshold={0.1}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(true)} />}
        ListFooterComponent={<ActivityIndicator style={styles.loader} />}
      />
    </SafeAreaView>
  )
}
