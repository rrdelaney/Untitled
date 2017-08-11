const IS_PRODUCTION = process.env.NODE_ENV === 'production'
if (!IS_PRODUCTION) require('babel-register')({ cache: false })
if (!IS_PRODUCTION) require('dotenv').config()

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const morgan = require('morgan')
const chalk = require('chalk')
const passport = require('passport')
const { Strategy: FacebookStrategy } = require('passport-facebook')

const PORT = process.env.PORT || 3000

const logMsg = msg => console.log(chalk.cyan(`==> ${msg}`))
const logErr = msg => console.error(chalk.red(`==> ${err}`))

const users = {}

const app = express()

// Logging requests
app.use(morgan('dev'))

// Configure auth
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.HOSTNAME}/auth/facebook/callback`
    },
    (accessToken, refreshToken, profile, done) => {
      users[profile.id] = profile
      done(null, users[profile.id])
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

app.use(bodyParser())
app.use(session({ secret: 'shhh' }))
app.use(passport.initialize())
app.use(passport.session())

app.get('/auth/facebook', passport.authenticate('facebook'))
app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
)

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

// Set up webpack dev server or use statics from /build
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

// Require server.js request handler for everything else
app.use((...handler) => require('./src/server').handleRequest(...handler))

// Start the server
app.listen(PORT, () => {
  logMsg(`Listening at port ${PORT}`)
})

// In development, clear require.cache for reloaded files
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
