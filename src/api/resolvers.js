export const Query = {
  user(root, { id }, { db }) {
    return db[id]
  },

  post(root, { id }, { db }) {
    return db[id]
  }
}

export const User = {
  posts({ postIds }, args, { db }) {
    return postIds.map(id => db[id])
  }
}

export const Post = {
  author({ authorId }, args, { db }) {
    return db[authorId]
  }
}
