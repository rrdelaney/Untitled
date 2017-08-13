// @flow

import type Context from './context'

export const Query = {
  user(root: mixed, { id }: { id: string }, c: Context) {
    return c.userById(id)
  },

  post(root: mixed, { id }: { id: string }, c: Context) {
    return c.postById(id)
  },

  self(root: mixed, args: mixed, c: Context) {
    if (c.user === null) return

    return c.userById(c.user.id)
  }
}

export const User = {
  posts({ id }: any, args: mixed, c: Context) {
    return c.postsByUser(id)
  }
}

export const Post = {
  author({ author_id }: any, args: mixed, c: Context) {
    return c.userById(author_id)
  }
}
