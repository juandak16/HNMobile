import {API_URL} from '../local/constant'

export type RequestData = {
  page: number
  limit: number
}

export const getEndpoint = ({page, limit}: RequestData) => {
  return `${API_URL}?query=mobile&page=${page}&hitsPerPage=${limit}`
}

export const getNews = async ({page, limit}: RequestData) => {
  try {
    const endpoint = getEndpoint({page, limit})
    const response = await fetch(endpoint)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}
