import {useEffect, useState} from 'react'
import {RequestData, getNews} from 'src/data/remote/news'
import {FormattedNews, getNewsFormatted} from '../getNewsFormatted'

export const useApiCall = ({page, limit}: RequestData) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<FormattedNews[]>([])
  const [error, setError] = useState<Error>()

  const fetchData = async () => {
    try {
      const response = await getNews({page, limit})
      const dataFormatted = getNewsFormatted(response)
      setData(dataFormatted)
    } catch (error) {
      setError(error as Error)
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit])

  return {loading, data, error, fetchData}
}
