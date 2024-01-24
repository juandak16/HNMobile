import {useEffect, useState} from 'react'
import {FormattedNews} from '../getNewsFormatted'
import {LIMIT} from 'src/data/local/constant'
import {useApiCall} from './useApiCall'

export const useHome = () => {
  const [news, setNews] = useState<FormattedNews[]>([])
  const [deletes, setDeletes] = useState<number[]>([])
  const [page, setPage] = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  let {data, fetchData} = useApiCall({page, limit: LIMIT})

  useEffect(() => {
    if (data) {
      let newArray = news.concat(data).filter(item => !deletes.includes(item.id))
      const uniqueIds = new Set()
      const filteredData = newArray.filter(item => !uniqueIds.has(item.id) && uniqueIds.add(item.id))
      setNews(filteredData)
      setRefreshing(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, deletes])

  useEffect(() => {
    if (refreshing) {
      setPage(0)
      setNews([])
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing])

  return {
    news,
    setDeletes,
    setPage,
    setRefreshing,
    refreshing,
  }
}
