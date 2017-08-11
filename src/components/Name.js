import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  name: state.auth && state.auth.name
})

export default connect(mapStateToProps)(
  ({ name }) =>
    name
      ? <p>
          Hello {name}!
        </p>
      : <p>Not logged in</p>
)
