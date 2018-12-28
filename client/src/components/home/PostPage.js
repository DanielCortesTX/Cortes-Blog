import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost, addLike } from '../../actions/postActions'
import PostDisplay from './PostDisplay'
import CommentForm from './CommentForm'
import CommentFeed from './CommentFeed'

class PostPage extends Component {
  // state = {
  //   invert: false
  // }
  // // constructor(props){
  //   super(props)
    
  //   state = state
  // }
  
  componentDidMount(){
    console.log(this.props.match.params.id)
    this.props.getPost(this.props.match.params.id)
  }
  // toggleInvert(){
    
  //   this.setState(() => ({
  //     invert: !this.state.invert
  //   }))
  //   console.log(this.state.invert)
  // }

  render() {
    const { post, loading, isAuthed } = this.props

    let postDisplay

    if(post === null || loading || Object.keys(post).length === 0){
      postDisplay = <h3 className="load-adjust">Loading...</h3>
    } else {
      postDisplay = (
        <div className="">
          <PostDisplay post={post}/>
          {isAuthed ? <CommentForm postId={post._id}/> : <h1 className="lead mb-3">Sign in to make comments and mark as interesting</h1>}
          <CommentFeed comments={post.comments}/>
        </div>
      )
    }

    return (
      <div>
        {postDisplay}
      </div>
    )
  }
}

function mapStateToProps({ auth, post }) {
  return {
    user: auth.user,
    isAuthed: auth.isAuthenticated,
    post: post.post,
    loading: post.loading
  }
}

export default connect(mapStateToProps, { getPost, addLike })(PostPage)