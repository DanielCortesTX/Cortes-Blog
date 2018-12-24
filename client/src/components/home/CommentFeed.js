import React, { Component } from 'react'

export default class CommentFeed extends Component {
  render() {
    return (
      <div>
        <h1>Comments:</h1>
        {this.props.comments.map((comment, index) => {
          return <div key={index} className="card card-body bg-dark text-white mb-3">
            <h4 className="text-underline">{comment.username}</h4>
            <p className="lead">{comment.text} </p>
          </div>
        })}
      </div>
    )
  }
}