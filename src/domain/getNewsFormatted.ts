export type FormattedNews = {
  id: number
  title: string
  author: string
  url: string
  created_at: string
}

type NewsType = {
  hits: [
    {
      objectID: string
      story_title?: string
      title: string
      author: string
      story_url?: string
      url?: string
      created_at: string
    },
  ]
}

export const getNewsFormatted = (data: NewsType) => {
  const uniqueTitle = new Set()
  const formattedData = data.hits
    .map(item => {
      return {
        id: parseInt(item.objectID, 10),
        title: item.story_title ?? item.title,
        author: item.author,
        url: item.story_url ?? item.url,
        created_at: item.created_at,
      }
    })
    .filter(item => !uniqueTitle.has(item.title) && uniqueTitle.add(item.title))
    .filter(item => item.url) as FormattedNews[]
  return formattedData
}
