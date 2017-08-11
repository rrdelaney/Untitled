// @flow

type LoginAction = {
  type: 'LOGIN',
  user: { id: string, name: string }
}

export type Action = LoginAction
