import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'

class Register extends Component {
  constructor(){
    super()
    this.state = {
      username: '',
      password: '',
      password2: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerUser(newUser, this.props.history)
  }

  render() {
    const { errors } = this.state

    return (
      <div className="register-log">
        <div className="container">
          <div className="m-auto display-3">
            <h1 className="text-center display-3 lead small">Sign up
            </h1>
            <p className="lead text-center">Create a username to comment and like posts</p>
            <form onSubmit={this.onSubmit}>
              <div noValidate className="form-group">
                <input 
                  type="text"
                  className={classnames('form-control form-control-lg bg-dark text-light', {
                    'is-invalid': errors.username
                  })}
                  placeholder="Username"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                />
                {errors.username && (<div
                  className="invalid-feedback">
                  {errors.username}</div>)}
              </div>
              <div className="form-group">
                <input 
                  type="password"
                  className={classnames('form-control form-control-lg bg-dark text-light', {
                    'is-invalid': errors.password
                  })}
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                {errors.password && (<div
                className="invalid-feedback">
                {errors.password}</div>)}
              </div>
              <div className="form-group">
                <input 
                  type="password"
                  className={classnames('form-control form-control-lg bg-dark text-light', {
                    'is-invalid': errors.password2
                  })}
                  placeholder="Confirm Password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                />
                {errors.password2 && (<div
                className="invalid-feedback">
                {errors.password2}</div>)}
              </div>
              <input 
                  type="submit"
                  className="btn btn-lg btn-primary mb-4"
              />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register))