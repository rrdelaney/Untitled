// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import { configureStore } from './store'
import App from './components/App'

let root
let store

window.onload = () => {
  root = document.getElementById('root')
  store = configureStore(window.INITIAL_STATE)

  ReactDOM.render(<App store={store} />, root)
}
;(module: any)
if (module.hot) {
  ;(module.hot: any).accept('./components/App', () => {
    const NextApp = require('./components/App').default
    ReactDOM.render(<NextApp store={store} />, root)
  })
}
