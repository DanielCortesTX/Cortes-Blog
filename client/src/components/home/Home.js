import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/postActions'

class Home extends Component {
  componentDidMount(){
    const { user, posts } = this.props
    this.props.getPosts()

    console.log(user)
    console.log(posts)
  }
  render() {
    const { user, posts, loading } = this.props
    let postFeed

    if(posts === null || loading){
      postFeed = <h3>Loading...</h3>
    } else {
      postFeed = posts.map((post) => <p>{post.text}</p>)
    }

    return (
      <div>
        <h1>This is the dashboard</h1>
          {postFeed}
      </div>
    )
  }
}

const mapStateToProps = ({ auth, post }) => ({
  user: auth.user,
  posts: post.posts,
  loading: post.loading
})

export default connect(mapStateToProps, { getPosts })(Home)