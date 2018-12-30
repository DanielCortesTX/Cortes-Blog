import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost } from '../actions/postActions'


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
      title: this.state.title,
      text: this.state.text
    }

    this.props.addPost(newPost, this.props.history)
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
                  'is-invalid': errors.title
                })}
                placeholder="Title"
                name="title"
                value={this.state.title}
                onChange={this.onChange}
              />
              {errors.title && (<div
                className="invalid-feedback">
                {errors.title}</div>)}
            </div>
            <div className="form-group">
              <textarea 
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.title
                })}
                placeholder="Make post here."
                name="text"
                value={this.state.text}
                onChange={this.onChange}
              />
              {errors.text && (<div
              className="invalid-feedback">
              {errors.text}</div>)}
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
  errors: PropTypes.object.isRequired
}

function mapStateToProps({ errors }){
  return {
    errors
  }
}

export default connect(mapStateToProps, { addPost })(withRouter(CreatePost))