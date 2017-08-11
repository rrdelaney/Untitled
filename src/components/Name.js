import React from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'

const mapStateToProps = state => ({
  name: state.auth && state.auth.name
})

export default connect(mapStateToProps)(
  ({ name }) =>
    name
      ? <Header as="h2">
          Hello {name}!!
        </Header>
      : <Header as="h2">Not logged in</Header>
)
