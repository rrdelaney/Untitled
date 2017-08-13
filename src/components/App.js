// @flow

import React from 'react'
import { ApolloProvider, ApolloClient } from 'react-apollo'
import type { Store } from '../store'
import Name from './Name'
import Posts from './Posts'

type AppProps = {
  store: Store,
  client: ApolloClient
}

export default function App({ store, client }: AppProps) {
  return (
    <ApolloProvider store={store} client={client}>
      <div>
        <Name />
        <Posts />
      </div>
    </ApolloProvider>
  )
}
