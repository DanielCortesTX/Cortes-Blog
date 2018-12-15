import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'

class Register extends Component {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = ({auth, errors}) => ({
  auth,
  errors
})

export default connect(mapStateToProps, )(withRouter(Register))