import React, { Component } from 'react'

class PostDisplay extends Component {
  render() {
    const { post } = this.props
    return (
      <div className="mt-3 mb-3">
        <h2 className="text-center">The post: {post.title}</h2>
        <div className="card post-display lead mb-4">{post.text}</div>
      </div>
    )
  }
}

export default PostDisplay