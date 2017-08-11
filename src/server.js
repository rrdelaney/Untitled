// @flow

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import serialize from 'serialize-javascript'
import type { $Request, $Response } from 'express'
import App from './components/App'
import { configureStore } from './store'
import { login } from './store/actions'

export const handleRequest = (req: $Request, res: $Response) => {
  res.status(200)

  const store = configureStore()

  const user = serializeUser(req)
  if (user) store.dispatch(login(user))

  const initialState = getInitialState(store)
  const content = ReactDOMServer.renderToString(<App store={store} />)

  res.send(`<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"></link>
    <script>window.INITIAL_STATE = ${initialState}</script>
  </head>
  <body>
    <div id="root">${content}</div>
    <script src="/app.js"></script>
  </body>
</html>`)
}

function serializeUser(req): { id: string, name: string } | null {
  ;(req: any)

  if (!req.user || !req.user._json) return null

  return (req.user: any)._json
}

function getInitialState(store): string {
  return serialize(store.getState(), { isJSON: true })
}
