import { ADD_POST } from './types'
import axios from 'axios'

// Register User
export const addPost = (newPost, history) => (dispatch) => {
  axios.post('/api/post', newPost)
    .then(res => {
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    })
    .then(res => history.push('/home'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}