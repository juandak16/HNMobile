import {FormattedNews, NewsType, getNewsFormatted} from 'src/domain/getNewsFormatted'

describe('getNewsFormatted', () => {
  const mockData: NewsType = {
    hits: [
      {
        objectID: '1',
        title: 'Mock Title',
        author: 'Mock Author',
        url: 'Mock URL',
        created_at: 'Mock Date',
      },
    ],
  }
  it('formats news data correctly', () => {
    const formattedData: FormattedNews[] = getNewsFormatted(mockData)

    expect(formattedData).toEqual([
      {
        id: 1,
        title: 'Mock Title',
        author: 'Mock Author',
        url: 'Mock URL',
        created_at: 'Mock Date',
      },
    ])
  })
})
