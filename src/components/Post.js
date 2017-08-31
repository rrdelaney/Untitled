import React from 'react'
import { gql, graphql } from 'react-apollo'
import { Loader } from 'semantic-ui-react'

const PostData = gql`
  query PostData($id: ID!) {
    post(id: $id) {
      id
      title
      author {
        id
        name
      }
    }
  }
`

function Post({ data }) {
  if (data.loading) return <Loader active />
  if (!data.post) return null

  return (
    <div>
      {data.post.title} by {data.post.author.name}
    </div>
  )
}

export default graphql(PostData, {
  options: ({ match }) => ({ variables: { id: match.params.id } })
})(Post)
