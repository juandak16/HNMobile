import {renderHook, waitFor} from '@testing-library/react-native'
import fetchMock from 'fetch-mock'
import {RequestData} from 'src/data/remote/news'
import {useApiCall} from 'src/domain/hooks/useApiCall'

jest.mock('src/data/remote/news', () => ({
  getNews: jest.fn(() =>
    Promise.resolve({
      hits: [{objectID: '1', title: 'Mock Title', author: 'Mock Author', url: 'Mock URL', created_at: 'Mock Date'}],
    }),
  ),
}))
jest.mock('src/domain/getNewsFormatted', () => ({
  getNewsFormatted: jest.fn(() => ({
    id: 1,
    title: 'Mock Title',
    author: 'Mock Author',
    url: 'Mock URL',
    created_at: 'Mock Date',
  })),
}))
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}))

describe('useApiCall', () => {
  afterEach(() => {
    fetchMock.restore()
  })
  const mockRequestData: RequestData = {page: 1, limit: 10}
  it('fetches and displays news data correctly', async () => {
    const {result} = renderHook(() => useApiCall(mockRequestData))
    await waitFor(() => result.current.loading === false)
    expect(result.current.data).toEqual({
      id: 1,
      title: 'Mock Title',
      author: 'Mock Author',
      url: 'Mock URL',
      created_at: 'Mock Date',
    })
  })
})
