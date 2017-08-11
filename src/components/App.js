// @flow

import React from 'react'
import { Provider } from 'react-redux'
import type { Store } from '../store'
import Name from './Name'

type AppProps = {
  store: Store
}

export default function App({ store }: AppProps) {
  return (
    <Provider store={store}>
      <Name />
    </Provider>
  )
}
