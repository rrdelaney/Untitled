// @flow

import type Context, {
  User as UserType,
  Post as PostType,
  Issue as IssueType,
  Community as CommunityType
} from './context'

export const Query = {
  user(root: mixed, { id }: { id: string }, c: Context) {
    return c.userById(id)
  },

  post(root: mixed, { id }: { id: number }, c: Context) {
    return c.postById(id)
  },

  community(root: mixed, { id }: { id: string }, c: Context) {
    return c.communityById(id)
  },

  self(root: mixed, args: mixed, c: Context) {
    if (c.user === null) return

    return c.userById(c.user.id)
  }
}

export const User = {
  posts({ id }: UserType, args: mixed, c: Context) {
    return c.postsByUser(id)
  }
}

export const Post = {
  author({ author_id }: PostType, args: mixed, c: Context) {
    return c.userById(author_id)
  },

  community({ community_id }: PostType, args: mixed, c: Context) {
    return c.communityById(community_id)
  }
}

export const Community = {
  posts(
    { id }: CommunityType,
    args: { offset: number, limit: number },
    c: Context
  ) {
    return c.postsByCommunity(id, args.offset, args.limit)
  },

  issues({ id }: CommunityType, args: mixed, c: Context) {
    return c.issuesByCommunity(id)
  }
}

export const Issue = {
  posts({ post_ids }: IssueType, args: mixed, c: Context) {
    return Promise.all(post_ids.map(id => c.postById(id)))
  }
}
