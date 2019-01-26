import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../../../actions/postActions'
import classnames from 'classnames'
 
// @desc Local state handles text input and errors. Errors are passed in as props from error reducer. Logged user is inherited and used in new comment creation.

class CommentForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      text: '',
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
    const { postId } = this.props
    // const filter = new Filter()
    // console.log(filter.clean(this.state.text))

    const newComment = {
      text: this.state.text,
      username: this.props.user.username,
    }

    this.props.addComment(postId, newComment)
    this.setState({ text: '' })
  }

  render() {
    const { errors } = this.props
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <textarea 
              className={classnames('form-control form-control-lg bg-dark text-white lead', {
                'is-invalid': errors.text
                  })}
              placeholder="Comment must be between 2 and 500 characters"
              name="text"
              value={this.state.text}
              onChange={this.onChange}
            />
              {errors.text && (
                <div
                className="invalid-feedback">
                {errors.text}
                </div>)
              }
          </div>
            <input 
              type="submit"
              className="btn btn-lg btn-primary mb-3"
            />
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, errors }) => {
  return {
    user: auth.user,
    errors
  }
}

export default connect(mapStateToProps, { addComment })(CommentForm)