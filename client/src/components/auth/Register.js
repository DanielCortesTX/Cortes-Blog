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

    console.log('yes')

    this.props.registerUser(newUser, this.props.history)

    console.log(newUser)
  }
  render() {
    const { errors } = this.state

    return (
      <div className="register-log">
        <div className="container">
          <div className="m-auto">
            <h1 className="display-5 text-center">Sign up
            </h1>
            <p className="lead text-center">Create a username to comment and like posts</p>
            <form onSubmit={this.onSubmit}>
              <div noValidate className="form-group">
                <input 
                  type="text"
                  className={classnames('form-control form-control-lg', {
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
                  className={classnames('form-control form-control-lg', {
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
                  className={classnames('form-control form-control-lg', {
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
                  className="btn btn-outline-primary mb-4"
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