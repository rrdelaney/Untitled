import React from 'react'
import { gql, graphql } from 'react-apollo'
import styled from 'styled-components'
import { Menu } from 'semantic-ui-react'

const AppHeaderContainer = styled.div`
  border-radius: 0 !important;
  padding: 0;
  margin: 0 !important;
`

const UserData = gql`
  query UserData {
    self {
      id
    }
  }
`

export function AppHeader({ data }) {
  return (
    <Menu inverted as={AppHeaderContainer}>
      <Menu.Item name="untitles">Untitiled Edition</Menu.Item>
      <Menu.Menu position="right">
        {data.self && <Menu.Item name="Logout">Logout</Menu.Item>}
      </Menu.Menu>
    </Menu>
  )
}

export default graphql(UserData)(AppHeader)
