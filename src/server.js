import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './App'

export const handleRequest = (req, res) => {
  res.status(200)

  const content = ReactDOMServer.renderToString(<App />)

  res.send(`<!doctype html>
<html>
  <div id="root">${content}</div>
  <script src="/app.js"></script>
</html>`)
}
