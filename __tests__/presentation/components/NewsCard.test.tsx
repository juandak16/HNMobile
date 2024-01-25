import React from 'react'
import {render, fireEvent} from '@testing-library/react-native'
import NewsCard from 'src/presentation/components/NewsCard'

jest.mock('src/domain/context/ThemeContext', () => ({
  useTheme: () => ({
    colors: {
      primary: '#ed5c53',
      secondary: '#ed5c53',
      primaryText: '#ed5c53',
      secondaryText: '#ed5c53',
    },
  }),
}))

jest.mock('dayjs', () => {
  const dayjs = jest.requireActual('dayjs')
  const relativeTime = jest.requireActual('dayjs/plugin/relativeTime')

  dayjs.extend(relativeTime)

  dayjs.prototype.fromNow = jest.fn(() => '2 days ago')

  return dayjs
})

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...props,
})

describe('NewsCard', () => {
  const mockItem = {
    id: 1,
    title: 'Mock Title',
    author: 'Mock Author',
    created_at: '2022-01-20T12:34:56Z',
    url: 'https://example.com',
  }

  const mockOnDelete = jest.fn()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let props: any
  beforeEach(() => {
    props = createTestProps({})
  })

  it('renders correctly', () => {
    const {getByText, getByTestId} = render(
      <NewsCard item={mockItem} navigation={props.navigation} onDelete={mockOnDelete} />,
    )

    expect(getByText('Mock Title')).toBeTruthy()
    expect(getByText('Mock Author-2 days ago')).toBeTruthy()
    expect(getByTestId('news-card')).toBeTruthy()
  })

  it('navigates to NewsDetail on press', () => {
    const {getByTestId} = render(<NewsCard item={mockItem} navigation={props.navigation} onDelete={mockOnDelete} />)

    fireEvent.press(getByTestId('news-card-button'))

    expect(props.navigation.navigate).toHaveBeenCalledWith('NewsDetail', {url: 'https://example.com'})
  })

  it('calls onDelete function on delete button press', () => {
    const {getByText} = render(<NewsCard item={mockItem} navigation={props.navigation} onDelete={mockOnDelete} />)

    fireEvent.press(getByText('Delete'))

    expect(mockOnDelete).toHaveBeenCalledWith(1)
  })
})
