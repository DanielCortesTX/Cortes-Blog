import React, { Component } from 'react'
import Moment from 'react-moment'

export default class CommentFeed extends Component {
  render() {
    return (
      <div>
        {this.props.comments.length > 0 ? 
          <div className="card card-body"><h1 className="mb-3">Comments:</h1>{this.props.comments.map((comment, index) => {
            return <div key={index} className="card card-body bg-dark text-white mb-3 pb-0 comment-header">
              <Moment className="mr-4" format="MMMM Do YYYY">
                {comment.date}
              </Moment>
              <div>
                <h4 className="mr-4">{comment.username}</h4>
                <p className="lead">{comment.text} </p>
              </div>
            </div>
          })}</div> 
          : null}
      </div>
    )
  }
}

// (
//   <div>
//     {this.props.comments.length > 0 ? <h1>Comments:</h1> : null}
//     {<div className="card card-body"><h1>Comments:</h1>{this.props.comments.map((comment, index) => {
//       return <div key={index} className="card card-body bg-dark text-white mb-3">
//         <h4 className="text-underline">{comment.username}</h4>
//         <p className="lead">{comment.text} </p>
//       </div>
//     })}</div>}
//   </div>
// )