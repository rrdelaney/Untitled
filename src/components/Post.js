// @flow

import React from 'react'
import { gql, graphql } from 'react-apollo'
import styled from 'styled-components'
import { Image, Loader } from 'semantic-ui-react'

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

const PostHeader = styled.div`width: 100vw;`

function Post({ data }) {
  if (data.loading) return <Loader active />
  if (!data.post) return null

  return (
    <PostHeader>
      <Image src="https://unsplash.it/1000/300" fluid />
      {data.post.title} by {data.post.author.name}
    </PostHeader>
  )
}

export default graphql(PostData, {
  options: ({ match }) => ({ variables: { id: match.params.id } })
})(Post)
