// @flow

import React from 'react'
import { renderToStringWithData } from 'react-apollo'
import serialize from 'serialize-javascript'
import type { $Request, $Response, NextFunction } from 'express'
import { graphqlExpress } from 'apollo-server-express'
import configureServerClient from './apollo/configureServerClient'
import _db from './api/db'
import schema from './api/schema'
import Context from './api/context'
import App from './components/App'
import configureStore from './store'
import { login } from './store/actions'

export async function registerUser(profile: {
  id: string,
  displayName: string
}) {
  const db = await _db
  const user = await db.users.findOne({ id: profile.id })

  if (!user) {
    return db.users.insert({ id: profile.id, name: profile.displayName })
  } else {
    return user
  }
}

export async function handleGraphQL(
  ...handler: [$Request, $Response, NextFunction]
) {
  const [req] = handler
  const context = new Context(await _db, serializeUser(req))

  return graphqlExpress({ schema, context })(...handler)
}

export async function handleRequest(req: $Request, res: $Response) {
  const user = serializeUser(req)
  const context = new Context(await _db, user)
  const store = configureStore()
  const client = configureServerClient(context)

  if (user) store.dispatch(login(user))

  const content = await renderToStringWithData(
    <App store={store} client={client} />
  )

  const initialState = getInitialState(store, client)
  const assets = getAssets(res)

  res.status(200).send(`<!doctype html>
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

export function handleError(
  err: Error,
  req: $Request,
  res: $Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err)
  }

  console.error(err.stack)
  res.status(500).send(`<!doctype html>
<html>
  <head>
    <style>
      h1 {
        color: red;
        font-family: 'Helvetica Neue';
        font-size: 36pt;
        font-weight: 300;
      }
      pre {
        font-family: 'Operator Mono';
        font-size: 10pt;
        width: 90vw;
        white-space: pre-wrap;
      }
    </style>
  <body>
    <h1>There was an error :(</h1>
    <pre>${err.stack}</pre>
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

  if (!req.user) return null

  return (req.user: any)
}

function getInitialState(store, client): string {
  const initialState = {
    ...store.getState(),
    apollo: client.getInitialState()
  }

  return serialize(initialState, { isJSON: true })
}
