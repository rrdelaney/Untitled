const IS_PRODUCTION = process.env.NODE_ENV === 'production'
if (!IS_PRODUCTION) require('babel-register')({ cache: false })
require('dotenv').config()

const path = require('path')
const Raven = require('raven')
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const morgan = require('morgan')
const chalk = require('chalk')
const passport = require('passport')
const { Strategy: FacebookStrategy } = require('passport-facebook')
const { graphiqlExpress } = require('apollo-server-express')

const {
  PORT = 3000,
  HOSTNAME = 'http://localhost:3000',
  SENTRY_DSN,
  REDIS_URL,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET
} = process.env

if (IS_PRODUCTION && SENTRY_DSN) Raven.config(SENTRY_DSN).install()

const logMsg = msg => console.log(chalk.cyan(`==> ${msg}`))
const logErr = msg => console.error(chalk.red(`==> ${err}`))

const app = express()

// Configure Sentry
if (IS_PRODUCTION) app.use(Raven.requestHandler())

// gzip assets
if (IS_PRODUCTION) app.use(compression())

// Logging requests
app.use(
  morgan(
    `${chalk.cyan(
      'REQUEST '
    )} :method :url :status :response-time ms - :res[content-length]`
  )
)

// Configure auth
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: `${HOSTNAME}/auth/facebook/callback`
    },
    (accessToken, refreshToken, profile, done) => {
      require(`./${IS_PRODUCTION ? 'lib' : 'src'}/server`)
        .registerUser(profile)
        .then(user => {
          done(null, user)
        })
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

app.use(bodyParser.json())
app.use(
  session({
    secret: 'shhh',
    store: new RedisStore({ url: REDIS_URL }),
    resave: true,
    saveUninitialized: true
  })
)
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
      serverSideRender: true,
      quiet: true,
      stats: {
        colors: true
      }
    })
  )

  app.use(webpackHotMiddleware(compiler, { log: false }))
} else {
  const stats = require('./build/stats')
  const assets = [stats['main.js']]

  app.use(express.static('build'))
  app.use((req, res, next) => {
    res.locals.assets = assets
    next()
  })
}

app.use('/graphql', (...handler) => {
  const { handleGraphQL, handleError } = require(`./${IS_PRODUCTION
    ? 'lib'
    : 'src'}/server`)

  handleGraphQL(...handler).catch(e => handleError(e, ...handler))
})

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
)

// Require server.js request handler for everything else
app.use((...handler) => {
  const { handleRequest, handleError } = require(`./${IS_PRODUCTION
    ? 'lib'
    : 'src'}/server`)

  handleRequest(...handler).catch(e => handleError(e, ...handler))
})

// Set up Raven for error handling
if (IS_PRODUCTION) app.use(Raven.errorHandler())

// Error handler for sync errors
app.use((err, req, res, next) => {
  const { handleError } = require(`./${IS_PRODUCTION ? 'lib' : 'src'}/server`)

  handleError(err, req, res, next)
})

// Start the server
app.listen(PORT, () => {
  logMsg(`Listening at port ${PORT}`)
})

// In development, clear require.cache for reloaded files
if (!IS_PRODUCTION) {
  const gaze = require('gaze')

  gaze(['src/**/*.js', 'schema.graphql'], (err, watcher) => {
    watcher.on('changed', filepath => {
      for (let name in require.cache) {
        if (
          name.startsWith(path.resolve(__dirname, 'src')) &&
          !name.endsWith('db.js')
        ) {
          delete require.cache[name]
        }
      }
    })
  })
}
