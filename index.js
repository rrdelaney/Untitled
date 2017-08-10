const IS_PRODUCTION = process.env.NODE_ENV === 'production'
if (!IS_PRODUCTION) require('babel-register')({ cache: false })

const path = require('path')
const express = require('express')
const morgan = require('morgan')
const chalk = require('chalk')

const PORT = process.env.PORT || 3000

const logMsg = msg => console.log(chalk.cyan(`==> ${msg}`))
const logErr = msg => console.error(chalk.red(`==> ${err}`))

const app = express()

app.use(morgan('dev'))

if (!IS_PRODUCTION) {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackConfig = require('./scripts/webpack.config.dev')

  const compiler = webpack(webpackConfig)
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      stats: {
        colors: true
      }
    })
  )

  app.use(webpackHotMiddleware(compiler))
} else {
  app.use(express.static('build'))
}

app.use((...handler) => require('./src/server').handleRequest(...handler))

app.listen(PORT, () => {
  logMsg(`Listening at port ${PORT}`)
})

if (!IS_PRODUCTION) {
  const gaze = require('gaze')

  gaze('src/**/*.js', (err, watcher) => {
    watcher.on('changed', filepath => {
      for (let name in require.cache) {
        if (name.startsWith(path.resolve(__dirname, 'src'))) {
          delete require.cache[name]
        }
      }
    })
  })
}
