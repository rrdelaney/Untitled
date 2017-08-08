const IS_PRODUCTION = process.env.NODE_ENV === 'production'
if (!IS_PRODUCTION) require('babel-register')({ cache: false })

const express = require('express')
const morgan = require('morgan')
const chalk = require('chalk')

const PORT = process.env.PORT || 3000

const logMsg = msg => console.log(chalk.cyan(`==> ${msg}`))
const logErr = msg => console.error(chalk.red(`==> ${err}`))

const app = express()

app.use(morgan(':method :url'))

app.use((...handler) => require('./src/server').handleRequest(...handler))

app.listen(PORT, () => {
  logMsg(`Listening at port ${PORT}`)
})

if (!IS_PRODUCTION) {
  const gaze = require('gaze')

  gaze('src/**/*.js', (err, watcher) => {
    watcher.on('changed', filepath => {
      delete require.cache[filepath]
      logMsg('Server reloaded!')
    })
  })
}
