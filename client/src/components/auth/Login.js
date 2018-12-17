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
          <div className="row">
            <div>
              <h1 className="text-center display-5">
              Log In
              </h1>
              <p className=" lead text-center">Sign in to comment and like posts</p>
              <form>
                <div>
                  <input 
                    type="username"
                    className="form-control form-control-md"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login