import React, { Component } from 'react'

export default class NotOneLike extends Component {
  // constructor(props){
  //   super(props)
  // }
  render() {
    return (
      <div>
        <span>{this.props.likes} people found this interesting</span>
      </div>
    )
  }
}
