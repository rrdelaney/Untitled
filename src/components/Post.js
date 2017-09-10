// @flow

import * as React from 'react'
import { gql, graphql } from 'react-apollo'
import styled from 'styled-components'
import { Container, Image, Header, Loader } from 'semantic-ui-react'

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
    <div>
      <PostHeader>
        <Image src="https://unsplash.it/1000/300/?blur" fluid />
      </PostHeader>
      <Container text>
        <Header size="huge">{data.post.title}</Header>
        <Header size="small">{data.post.author.name}</Header>
      </Container>
    </div>
  )
}

export default graphql(PostData, {
  options: ({ match }) => ({ variables: { id: match.params.id } })
})(Post)
