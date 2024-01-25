import {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
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
      await AsyncStorage.setItem('backupData', JSON.stringify(dataFormatted))
      // eslint-disable-next-line no-catch-shadow
    } catch (error) {
      setError(error as Error)
      console.error('Error:', error)
      try {
        const storedBackupData = await AsyncStorage.getItem('backupData')
        if (storedBackupData) {
          setData(JSON.parse(storedBackupData))
        }
      } catch (storageError) {
        console.error('Error al cargar datos de respaldo desde AsyncStorage:', storageError)
      }
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
