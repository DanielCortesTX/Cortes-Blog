import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
// import { registerUser } from '../../actions/authActions'


class CreatePost extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      text: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
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

    const newPost = {
      text: this.state.text,
      title: this.state.title
    }

    // this.props.addPost(newUser, this.props.history)
    console.log(newPost)
  }

  render() {
    const { errors } = this.state

    return (
      <div>
      <div className="register-log">
      <div className="container">
        <div className="m-auto">
          <h1 className="display-5 text-center">Make a new post
          </h1>
          <p className="lead text-center">Give a relevant, teaser title and write something interesting</p>
          <form onSubmit={this.onSubmit}>
            <div noValidate className="form-group">
              <input 
                type="text"
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.text
                })}
                placeholder="Text"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
              />
              {errors.text && (<div
                className="invalid-feedback">
                {errors.text}</div>)}
            </div>
            <div className="form-group">
              <textarea 
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.password2
                })}
                placeholder="Confirm Password"
                name="Post here"
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
      </div>
    )
  }
}

CreatePost.propTypes = {
  // registerUser: PropTypes.func.isRequired,
  // auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = ({errors}) => ({
  errors
})

export default connect(mapStateToProps)(withRouter(CreatePost))