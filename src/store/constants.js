// @flow

type LoginAction = {
  type: 'LOGIN',
  user: { id: string, name: string }
}

export type ModalKind = 'login' | null

type ToggleModalAction = {
  type: 'TOGGLE_MODAL',
  modalKind: ModalKind,
  open: boolean
}

export type Action = LoginAction | ToggleModalAction
