import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'

class NavBar extends Component {
  onLogoutClick(e) {
    e.preventDefault()
    this.props.logoutUser()
  }

  render() {
    const { isAuthenticated, user } = this.props.auth

    const loggedIn = (
      <ul className="navbar-nav ml-auto">
        {user.username === 'Solidus' && <li className="nav-link">
          <Link
            className="nav-link p-counter"
            to="/create-post"
          >Create post</Link>
        </li>}
        <li className="nav-link">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link">
            Logout
          </a>
        </li>
        <li className="nav-link">
          <p
            className="navbar-text p-counter"
          >Hello {user.username}</p>
        </li>
      </ul>
    )

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

    return (
      <nav className="navbar navbar-expand-sm bg-secondary navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">HomeFree</Link>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
              </li>
            </ul>
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