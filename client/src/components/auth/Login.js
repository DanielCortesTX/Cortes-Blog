import React, { Component } from 'react'

class Login extends Component {
  constructor(){
    super()
    this.state = {
      username: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()

    const user = {
      username: this.state.username,
      password: this.state.password
    }

    console.log(user)
  }
  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="m-auto">
            <h1 className="text-center display-5">
            Log In
            </h1>
            <p className=" lead
            text-center">Sign in to comment
            and like posts</p>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input 
                  type="text"
                  className="form-control
                  form-control-md"
                  placeholder="Username"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input 
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
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

export default Login