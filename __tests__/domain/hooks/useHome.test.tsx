import {act, renderHook, waitFor} from '@testing-library/react-native'
import {useHome} from 'src/domain/hooks/useHome'

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

describe('useHome', () => {
  it('fetches and displays news data correctly', async () => {
    const {result} = renderHook(() => useHome())
    await waitFor(() => result.current.news.length > 0)
    expect(result.current.news).toEqual([
      {
        id: 1,
        title: 'Mock Title',
        author: 'Mock Author',
        url: 'Mock URL',
        created_at: 'Mock Date',
      },
    ])
    act(() => {
      result.current.setRefreshing(true)
    })
    await waitFor(() => result.current.refreshing === false)

    expect(require('src/data/remote/news').getNews).toHaveBeenCalledTimes(2)
    expect(require('src/domain/getNewsFormatted').getNewsFormatted).toHaveBeenCalledTimes(2)
  })
})
