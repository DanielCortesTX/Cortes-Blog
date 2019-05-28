import React, { Component } from 'react'
import { connect } from 'react-redux'
import BlogLink from './BlogLink'
import { getPosts } from '../../actions/postActions'
import classnames from 'classnames'

import Loading from '../frequents/Loading'

// @desc Inherits loading property until posts are returned from store. Posts are mapped through and given BlogLink component to display information.

class Home extends Component {
  componentDidMount(){
    this.props.getPosts()
  }
  render() {
    const { posts, loading } = this.props
    let postFeed

    if(posts === null || loading){
      postFeed = <Loading />
    } else {
      postFeed = posts.map((post) => <BlogLink key={post._id} post={post}/>)
    }

    return (
      <div className={classnames('p-4', { 'load-adjust': posts.length < 3})}>
        <div className="card mt-3">
        <h1 className="text-center text-uppercase lead display-4 mt-4 mb-4 pb-4">Cortes Corner</h1>
          {postFeed}
        </div>  
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