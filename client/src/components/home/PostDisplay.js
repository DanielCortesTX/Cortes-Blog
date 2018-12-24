import React, { Component } from 'react'

class PostDisplay extends Component {
  render() {
    const { post } = this.props
    return (
      <div className="card card-body mb-3 mt-3 mb-3">
        <h2 className="text-center text-uppercased">{post.title}</h2>
        <div className="card post-display bg-dark text-white lead mb-4 border-white">{post.text}</div>
      </div>
    )
  }
}

export default PostDisplay