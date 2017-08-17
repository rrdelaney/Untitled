// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store'
import configureClient from './apollo/configureClient'
import App from './components/App'

let root
let store
let client

window.onPageLoad.then(() => {
  root = document.getElementById('root')
  client = configureClient()
  store = configureStore(window.INITIAL_STATE, client)

  ReactDOM.render(<App store={store} client={client} />, root)
})
;(module: any)
if (module.hot) {
  ;(module.hot: any).accept('./components/App', () => {
    const NextApp = require('./components/App').default
    ReactDOM.render(<NextApp store={store} client={client} />, root)
  })
}
