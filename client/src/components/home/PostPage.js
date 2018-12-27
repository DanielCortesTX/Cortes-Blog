import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost, addLike } from '../../actions/postActions'
import PostDisplay from './PostDisplay'
import CommentForm from './CommentForm'
import CommentFeed from './CommentFeed'

class PostPage extends Component {
  componentDidMount(){
    console.log(this.props.match.params.id)
    this.props.getPost(this.props.match.params.id)
  }
  // clickLike (id) {
  //   console.log(id)
  //   addLike('yes')
  // }
  render() {
    const { post, loading, isAuthed } = this.props
    let postDisplay

    if(post === null || loading || Object.keys(post).length === 0){
      postDisplay = <h3>Loading...</h3>
    } else {
      postDisplay = (
        <div>
          <PostDisplay post={post}/>
          {isAuthed ? <CommentForm postId={post._id}/> : <h3 className="display-5 mb-3">Sign in to make comments</h3>}
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

const mapStateToProps = ({ auth, post }) => ({
  user: auth.user,
  isAuthed: auth.isAuthenticated,
  post: post.post,
  loading: post.loading
})

export default connect(mapStateToProps, { getPost, addLike })(PostPage)