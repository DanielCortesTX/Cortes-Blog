import axios from 'axios'

import { ADD_POST, GET_ERRORS, CLEAR_ERRORS, GET_POSTS, LOADING_POSTS, GET_POST } from './types'

// Make new post
export const addPost = (newPost, history) => (dispatch) => {
  dispatch(clearErrors())
  axios.post('/api/posts', newPost)
    .then(res => 
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .then(res => history.push('/home'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Get posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading())
  axios.get('/api/posts')
    .then(res => 
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    )
}

// Get specific post
export const getPost = (id) => dispatch => {
  dispatch(setPostLoading())
  axios.get(`/api/posts/${id}`)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    )
}

// add/remove like
export const addLike = (id) => dispatch => {
  axios.post(`/api/posts/like/${id}`)
    .then(res => 
      dispatch({
        type: GET_POST,
        payload: res.data
      }))
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: err.response.data
      })
    )
  console.log(id)
}

// Add Comment
export const addComment = (postId, newComment) => dispatch => {
  dispatch(clearErrors())
  axios.post(`/api/posts/comment/${postId}`, newComment)
    .then(res => 
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
     })
    )  
}

// Set loading page
export const setPostLoading = () => {
  return {
    type: LOADING_POSTS
  }
}

// clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}