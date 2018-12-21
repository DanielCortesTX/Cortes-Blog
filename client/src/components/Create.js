import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


class CreatePost extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      text: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  render() {
    return (
      <div>
        <h1>This is the create page</h1>
      </div>
    )
  }
}

export default CreatePost