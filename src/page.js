// @flow

type Next = {
  initialState?: string,
  content?: string,
  error?: Error
}

export default function* page(
  assets: string[]
): Generator<string, string, Next> {
  const { initialState, content, error } = yield `<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"></link>
    <script>window.onPageLoad = new Promise(resolve => { window.pageLoaded = resolve })</script>
    ${assets
      .filter(s => s.endsWith('.css'))
      .map(s => `<link rel="stylesheet" href="${s}">`)
      .join('    \n')}
    ${assets
      .filter(s => s.endsWith('.js') && !s.includes('hot-update'))
      .map(s => `<script async src="${s}"></script>`)
      .join('    \n')}`

  if (error) {
    return `
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
    <pre>${error.stack}</pre>
  </body>
</html>`
  }

  return `<script>window.INITIAL_STATE = ${initialState || 'undefined'}</script>
  </head>
  <body>
    <div id="root">${content || ''}</div>
    <script>window.pageLoaded()</script>
  </body>
</html>`
}
