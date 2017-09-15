// @flow

import * as React from 'react'
import { Link } from 'react-router-dom'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { gql, graphql } from 'react-apollo'
import styled from 'styled-components'
import { Menu } from 'semantic-ui-react'
import type { State, Dispatch } from '../store'
import { showModal } from '../store/actions'
import LoginModal from './LoginModal'

const AppHeaderContainer = styled.div`
  border-radius: 0 !important;
  padding: 0;
  margin: 0 !important;
`

const mapStateToProps = (state: State) => ({
  shouldShowLoginModal: state.modal.modalKind === 'login'
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ showModal }, dispatch)

const withUserData = graphql(gql`
  query UserData {
    self {
      id
    }
  }
`)

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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withUserData
)(AppHeader)
