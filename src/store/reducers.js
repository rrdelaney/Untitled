// @flow

import { combineReducers } from 'redux'
import type { Reducer } from 'redux'
import type { Action } from './constants'
import auth from './auth'
import type { AuthState } from './auth'

export type State = { +auth: AuthState }

const rootReducer: Reducer<State, Action> = combineReducers({ auth })

export default rootReducer
