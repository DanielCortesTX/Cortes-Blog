import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

class BlogLink extends Component {
  render() {
    const { post } = this.props
    return (
      <div className="card card-body bg-dark text-white card-mods mb-4 ml-4 mr-4">
        <Moment className="mr-4" format="MMMM Do YYYY">
          {post.date}
        </Moment>
        <div>
          <div>
            <h4>
              {post.title}
            </h4>
          </div>
          <div>
            <p>
              {post.text.slice(0, 75)}...
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