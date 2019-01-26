import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// @desc Route is used for administrator and handling of unauthorized users.

const PrivateRoute = ({ component: Component, auth, ...rest}) => (
  <Route 
    {...rest}
    render={props =>
      auth.isAdmin === 'administrator' ? (
        <Component {...props} />
      ) : (
        <Redirect to="/home" />
      )
    }
  />
 )

 PrivateRoute.propTypes = {
   auth: PropTypes.object.isRequired
 }

 const mapStateToProps = ({ auth }) => ({
   auth
 })

 export default connect (mapStateToProps)(PrivateRoute)