import React, { Component } from 'react'

// @desc component is rendered whenever number of likes does not equal one for proper sentence structure.

export default class NotOneLike extends Component {
  render() {
    return (
      <div>
        <span>{this.props.likes} people found this interesting</span>
      </div>
    )
  }
}
