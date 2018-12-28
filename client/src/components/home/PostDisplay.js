import React, { Component } from 'react'
import { connect } from 'react-redux'
import SingleLike from './SingleLike'
import NotOneLike from './NotOneLike'
import { addLike } from '../../actions/postActions'

class PostDisplay extends Component {
  // constructor(){
  //   super(pr)
  // }
  onClickLike(id){
    this.props.addLike(id)
  }
  render() {
    const { post, isAuthed } = this.props
    let oneLike = post.likes.length === 1 ? true : false
    let likeDisplay
    const likeNumber = post.likes.length

    if(oneLike) {
      likeDisplay = <SingleLike />
    } else {
      likeDisplay = <NotOneLike likes={likeNumber} />
    }

    return (
      <div className="card card-body mt-3 mb-3">
        <h2 className="text-center text-uppercased display-4 lead">{post.title}</h2>
        <div className="card post-display bg-dark text-white lead mb-4 border-white">{post.text}</div>
        <div>
          {isAuthed && 
            <button type="button" className="btn btn-light bg-dark text-light comment-header" onClick={() => this.onClickLike(post._id)}>
              <i className="fas fa-angle-up text-info mr-2"/>
              <span>{likeDisplay}</span>
            </button>
          }
          {!isAuthed && likeDisplay} 
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