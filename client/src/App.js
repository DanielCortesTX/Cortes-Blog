import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { Provider } from 'react-redux'
import store from './store'

import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Home from './components/home/Home'
import PostPage from './components/home/specific-post/PostPage'
import CreatePost from './components/CreatePost'

import './styles/style.scss'
import PrivateRoute from './components/frequents/PrivateRoute';

// Check for token
if(localStorage.jwtToken){
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken)
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken)
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000
  if(decoded.exp < currentTime){
    // Logout user
    store.dispatch(logoutUser())
    // TODO: Clear current Profile

    // Redirect to landing
    window.location.href = '/'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <NavBar />
            <Route exact path="/" component={Landing}/>
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login}/>
              <Route exact path="/home" component={Home}/>
              <Route exact path="/post-display/:id" component={PostPage}/>
              <Switch>
                <PrivateRoute 
                  exact 
                  path="/create-post"
                  component={CreatePost}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App