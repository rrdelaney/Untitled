// @flow

import { ApolloClient, createNetworkInterface } from 'react-apollo'

export default function configureClient() {
  const networkInterface = createNetworkInterface({
    uri: '/graphql',
    opts: {
      credentials: 'same-origin'
    }
  })

  return new ApolloClient({
    networkInterface
  })
}
