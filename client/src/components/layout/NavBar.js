import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'

// @desc Navbar has different links depending on if user is logged in or is logged in as administrator

class NavBar extends Component {
  onLogoutClick(e) {
    e.preventDefault()
    this.props.logoutUser()
  }

  render() {
    const { isAuthenticated, user } = this.props.auth

    const unlogged = (
      <ul className="navbar-nav ml-auto">

        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    )

    const loggedIn = (
      <div className="navbar-nav check-align">
        {user.username === 'Solidus' && 
          <Link
            className="nav-link nav-item"
            to="/create-post"
          >
            Create post
          </Link>
        }
        <button
          onClick={this.onLogoutClick.bind(this)}
          className="nav-link nav-item neutral border-0">
            Logout
        </button>
        <button
          className="nav-link nav-item neutral border-0"
        >
          Hello {user.username}
        </button>
      </div>
    )

    return (
      <nav className="navbar navbar-expand-sm bg-secondary navbar-dark p-3">
        <div className="container">
          <div className="navbar-nav">
            <Link className="navbar-brand" to="/">Get Started</Link>  
            <Link className="nav-link nav-item" to="/home">{' '}Blog Feed</Link>
          </div>
          <div>
            {isAuthenticated ? loggedIn : unlogged}
          </div>  
        </div>
      </nav>
    )
  }
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = ({auth}) => ({
  auth
})

export default connect(mapStateToProps, { logoutUser })(NavBar)