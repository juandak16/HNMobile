// __tests__/YourComponent.test.js
import fetchMock from 'fetch-mock'
import {RequestData, getEndpoint, getNews} from 'src/data/remote/news'

jest.mock('src/data/local/constant', () => ({API_URL: 'https://your-api-url.com'}))

describe('YourComponent', () => {
  afterEach(() => {
    fetchMock.restore()
  })
  const mockRequestData: RequestData = {page: 1, limit: 10}
  const mockEndpoint = getEndpoint(mockRequestData)
  it('fetches and displays news data correctly', async () => {
    fetchMock.get(mockEndpoint, {hits: [{title: 'Mock News'}]})

    const result = await getNews(mockRequestData)

    expect(result).toEqual({hits: [{title: 'Mock News'}]})

    expect(fetchMock.called()).toBe(true)
  })

  it('returns correct endpoint', () => {
    const result = getEndpoint(mockRequestData)
    expect(result).toBe('https://your-api-url.com&page=1&hitsPerPage=10')
  })
})
