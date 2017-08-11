// @flow

import { createStore } from 'redux'
import type { Store } from 'redux'
import rootReducer from './reducers'
import type { State } from './reducers'
import type { Action } from './constants'

export function configureStore(initialState?: State): Store<State, Action> {
  return createStore(rootReducer, initialState)
}
