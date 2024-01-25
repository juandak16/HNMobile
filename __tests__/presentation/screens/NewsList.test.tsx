import React from 'react'
import {render, waitFor} from '@testing-library/react-native'
import NewsList from 'src/presentation/screens/NewsList'

// Mockear el contexto de tema y el hook useHome si es necesario
jest.mock('src/domain/context/ThemeContext', () => ({
  useTheme: jest.fn(() => ({colors: {primary: 'mockPrimaryColor'}})),
}))

jest.mock('src/domain/hooks/useHome', () => ({
  useHome: jest.fn(() => ({
    news: [
      {id: 1, title: 'Mock Title 1', author: 'Mock Author 1', url: 'Mock URL 1', created_at: 'Mock Date 1'},
      {id: 2, title: 'Mock Title 2', author: 'Mock Author 2', url: 'Mock URL 2', created_at: 'Mock Date 2'},
    ],
    setDeletes: jest.fn(),
    setPage: jest.fn(),
    setRefreshing: jest.fn(),
    refreshing: false,
  })),
}))

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...props,
})

describe('NewsList', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let props: any
  beforeEach(() => {
    props = createTestProps({})
  })

  it('renders NewsList component correctly', async () => {
    const {getByTestId, getByText} = render(<NewsList navigation={props.navigation} />)
    await waitFor(() => getByText('Mock Title 1'))

    expect(getByTestId('news-list')).toBeTruthy()

    expect(getByText('Mock Title 1')).toBeTruthy()
    expect(getByText('Mock Title 2')).toBeTruthy()
  })
})
