// flow-typed signature: 3c4dc4106e84900c5b70a0b38f2e6db9
// flow-typed version: <<STUB>>/raven_v2/flow_v0.54.1

import type { express$Middleware } from 'express'

/**
 * This is an autogenerated libdef stub for:
 *
 *   'raven'
 *
 * Fill this stub out by replacing all the `any` types.
 *
 * Once filled out, we encourage you to share your work with the
 * community by sending a pull request to:
 * https://github.com/flowtype/flow-typed
 */

declare module 'raven' {
  declare interface RavenInstance {
    install(): void
  }

  declare interface Raven {
    config(dsn: string): RavenInstance,
    requestHandler(): express$Middleware,
    errorHandler(): express$Middleware
  }

  declare module.exports: Raven
}