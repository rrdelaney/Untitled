// @flow

import DataLoader from 'dataloader'

export type User = {
  id: string,
  name: string
}

export type Post = {
  id: number,
  title: string,
  content: string,
  community_id: string,
  author_id: string
}

export type Community = {
  id: string,
  name: string
}

export type Issue = {
  id: number,
  headline: string,
  published: Date,
  post_ids: number[],
  community_id: string
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

  postById(id: number): Promise<Post> {
    return this.db.posts.findOne({ id })
  }

  postsByCommunity(
    id: string,
    offset?: number,
    limit?: number
  ): Promise<Post[]> {
    return this.db.posts.find(
      { community_id: id },
      { offset, limit, order: 'published' }
    )
  }

  communityById(id: string): Promise<Community> {
    return this.db.communities.findOne({ id })
  }

  issueById(id: string): Promise<Issue> {
    return this.db.issues.findOne({ id })
  }

  issuesByCommunity(
    id: string,
    offset?: number,
    limit?: number
  ): Promise<Issue[]> {
    return this.db.issues.find(
      { community_id: id },
      { offset, limit, order: 'published' }
    )
  }
}
