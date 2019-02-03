import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

// @desc Component displays particulars of a post with a link to view the post in full.

class BlogLink extends Component {
  render() {
    const { post } = this.props
    return (
      <div className="card card-body bg-dark text-white mb-4 ml-4 mr-4">
        <Moment className="mr-4" format="MMMM Do YYYY">
          {post.date}
        </Moment>
        <div className="mr-4">
          <div>
            <h4>
              {post.title}
            </h4>
          </div>
          <div>
            <p>
              {post.text.slice(0, 150)}...
            </p>
          </div>
          <div>
            <Link to={`/post-display/${post._id}`} className="btn btn-lg btn-primary">
              View Full Post
            </Link>
          </div>
        </div>
        
      </div>
    )
  }
}

export default BlogLink