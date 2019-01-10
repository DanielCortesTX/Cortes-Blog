import React, { Component } from 'react'
import Moment from 'react-moment'

// @desc Handles display if no comments are passed in. Maps comments with display giving particulars in order of creation.

class CommentFeed extends Component {
  render() {
    return (
      <div>
        {this.props.comments.length > 0 ? 
          <div className="card card-body">
            <h1 className="mb-1">Comments:</h1>
            {this.props.comments.map((comment, index) => {
              return <div key={index} className="card card-body bg-dark text-white my-3 py-2 comment-header">
              <div className="d-flex flex-column">
                <Moment className="mr-4" format="h:mm a">
                  {comment.date}
                </Moment>
                <Moment className="mr-4" format="MM-DD-YY">
                  {comment.date}
                </Moment>
                </div>
                <div>
                  <h4 className="mr-4">{comment.username}</h4>
                  <p className="lead">{comment.text} </p>
                </div>
              </div>
            })}
          </div> 
          : null}
      </div>
    )
  }
}

export default CommentFeed