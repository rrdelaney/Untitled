// @flow

import { createStore } from 'redux'
import type { Store as _Store } from 'redux'
import rootReducer from './reducers'
import type { State } from './reducers'
import type { Action } from './constants'

export type Store = _Store<State, Action>

export function configureStore(initialState?: State): Store {
  return createStore(rootReducer, initialState)
}
