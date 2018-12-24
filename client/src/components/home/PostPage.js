import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost } from '../../actions/postActions'
import PostDisplay from './PostDisplay'
import CommentForm from './CommentForm'
import CommentFeed from './CommentFeed'

class PostPage extends Component {
  componentDidMount(){
    console.log(this.props.match.params.id)
    this.props.getPost(this.props.match.params.id)
  }
  render() {
    const { post, loading, isAuthed } = this.props
    let postDisplay

    if(post === null || loading || Object.keys(post).length === 0){
      postDisplay = <h3>Loading...</h3>
    } else {
      postDisplay = (
        <div>
          <PostDisplay post={post}/>
          {isAuthed ? <CommentForm postId={post._id}/> : null}
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

export default connect(mapStateToProps, { getPost })(PostPage)