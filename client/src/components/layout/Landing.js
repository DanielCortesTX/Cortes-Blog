import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Landing extends Component {
  render() {
    return (
      <div className="landing text-light">
        <div className="container">
          <div className="text-center">
            <h1 className="display-3 lead">Cortes Blog</h1>
            <p className="lead">The musings and introspection of a one Daniel Cortes</p>
            <Link to="/register" className="btn btn-lg btn-primary mr-2">Sign up</Link>
            <Link to="/login" className="btn btn-lg btn-primary">Login</Link>      
          </div>
          </div>         
      </div>
    )
  }
}

export default Landing