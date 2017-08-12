// @flow

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import serialize from 'serialize-javascript'
import type { $Request, $Response, NextFunction } from 'express'
import { graphqlExpress } from 'apollo-server-express'
import createSchema from './api/createSchema'
import App from './components/App'
import { configureStore } from './store'
import { login } from './store/actions'

const db = {
  '1': {
    id: '1',
    postIds: ['2', '3']
  },
  '2': {
    id: '2',
    title: 'Hello world',
    authorId: '1'
  },
  '3': {
    id: '3',
    title: 'Hello world II',
    authorId: '1'
  }
}

export const handleGraphQL = (
  ...handler: [$Request, $Response, NextFunction]
) => {
  const schema = createSchema()
  const context = { db }

  return graphqlExpress({ schema, context })(...handler)
}

export const handleRequest = (req: $Request, res: $Response) => {
  res.status(200)

  const store = configureStore()

  const user = serializeUser(req)
  if (user) store.dispatch(login(user))

  const initialState = getInitialState(store)
  const content = ReactDOMServer.renderToString(<App store={store} />)
  const assets = getAssets(res)

  res.send(`<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"></link>
    ${assets
      .filter(s => s.endsWith('.css'))
      .map(s => `<link rel="stylesheet" href="${s}">`)
      .join('    \n')}
    ${assets
      .filter(s => s.endsWith('.js') && !s.includes('hot-update'))
      .map(s => `<script async src="${s}"></script>`)
      .join('    \n')}
    <script>window.INITIAL_STATE = ${initialState}</script>
  </head>
  <body>
    <div id="root">${content}</div>
  </body>
</html>`)
}

function getAssets(res: any): string[] {
  if (res.locals.assets) {
    return res.locals.assets
  } else {
    return [].concat(res.locals.webpackStats.toJson().assetsByChunkName.main)
  }
}

function serializeUser(req): { id: string, name: string } | null {
  ;(req: any)

  if (!req.user || !req.user._json) return null

  return (req.user: any)._json
}

function getInitialState(store): string {
  return serialize(store.getState(), { isJSON: true })
}
