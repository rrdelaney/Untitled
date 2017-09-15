// @flow

import type { Action, ModalKind } from './constants'

export type ModalState = { +modalKind: ModalKind }

const initialState = { modalKind: null }

export default function reducer(
  state: ModalState = initialState,
  action: Action
): ModalState {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      if (action.open === false) {
        return { modalKind: null }
      } else {
        return { modalKind: action.modalKind }
      }

    default:
      return state
  }
}
