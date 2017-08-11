// @flow

import type { Action } from './constants'

export function login(user: { id: string, name: string }): Action {
  return { type: 'LOGIN', user }
}
