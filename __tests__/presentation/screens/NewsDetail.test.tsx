import React from 'react'
import {render, waitFor} from '@testing-library/react-native'
import NewsDetail, {NewsDetailScreenRouteProp} from 'src/presentation/screens/NewsDetail'

jest.mock('src/domain/context/ThemeContext', () => ({
  useTheme: jest.fn(() => ({colors: {primary: 'mockPrimaryColor', secondary: 'mockSecondaryColor'}})),
}))

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...props,
})

describe('NewsDetail', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let props: any
  beforeEach(() => {
    props = createTestProps({})
  })
  it('renders NewsDetail component correctly', async () => {
    const route: NewsDetailScreenRouteProp = {key: '12', name: 'NewsDetail', params: {url: 'https://example.com/'}} // Ajusta la estructura según la interfaz NewsDetailScreenRouteProp
    const {getByTestId} = render(<NewsDetail route={route} navigation={props.navigation} />)

    await waitFor(() => getByTestId('web-view'))

    expect(getByTestId('web-view')).toBeTruthy()
  })
})
