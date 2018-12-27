import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addLike } from '../../actions/postActions'

class PostDisplay extends Component {
  // constructor(){
  //   super(pr)
  // }
  onClickLike(id){
    this.props.addLike(id)
  }
  render() {
    const { post } = this.props
    return (
      <div className="card card-body mt-3 mb-3">
        <h2 className="text-center text-uppercased">{post.title}</h2>
        <div className="card post-display bg-dark text-white lead mb-4 border-white">{post.text}</div>
        <div>
          <button type="button" className="btn btn-light" onClick={() => this.onClickLike(post._id)}>
            <i className="fas fa-angle-up text-info mr-2"/><span>{post.likes.length} people found this interesting</span>
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, post }) => ({
  user: auth.user,
  isAuthed: auth.isAuthenticated,
  post: post.post,
  loading: post.loading
})

export default connect(mapStateToProps, { addLike })(PostDisplay)