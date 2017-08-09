import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './App'

export const handleRequest = (req, res) => {
  const page = createPage()
  res.status(200)

  const { value: head } = page.next()
  res.write(head)

  const content = ReactDOMServer.renderToString(<App />)

  setTimeout(() => {
    const { value: body } = page.next({ content })
    res.end(body)
  })
}

function* createPage() {
  const { content } = yield `<!doctype html>
    <html>`

  return `
    <div id="root">${content}</div>
    <script src="/app.js"></script>
  </html>
  `
}
