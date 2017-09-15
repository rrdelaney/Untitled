// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
import styled from 'styled-components'
import { Menu } from 'semantic-ui-react'
import LoginModal from './LoginModal'

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

function AppHeader({ data }) {
  return (
    <Menu inverted as={AppHeaderContainer}>
      <Menu.Item name="Home" as={Link} to="/">
        Untitiled Edition
      </Menu.Item>
      <Menu.Menu position="right">
        {data.self && (
          <Menu.Item name="Logout" href="/logout">
            Logout
          </Menu.Item>
        )}
        {!data.self && <Menu.Item name="Login">Login</Menu.Item>}
        {!data.self && <LoginModal open={false} />}
      </Menu.Menu>
    </Menu>
  )
}

export default graphql(UserData)(AppHeader)
