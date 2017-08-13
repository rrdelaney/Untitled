// @flow

import DataLoader from 'dataloader'

type User = {
  id: string,
  name: string
}

type Post = {
  id: string,
  title: string,
  authorId: string
}

export default class Context {
  db: any
  user: { id: string, name: string } | null

  constructor(db: any, user: { id: string, name: string } | null) {
    this.user = user
    this.db = db
  }

  userById(id: string): Promise<User> {
    return this.db.users.findOne({ id })
  }

  postsByUser(id: string): Promise<Post[]> {
    return this.db.posts.find({ author_id: id })
  }

  postById(id: string): Promise<Post> {
    return this.db.posts.findOne({ id })
  }
}
