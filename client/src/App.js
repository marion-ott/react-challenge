import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './index.scss'
import Login from './views/Login'
import Header from './components/Header'
import Profile from './views/Profile'
import List from './views/List'
import ResetPassword from './views/ResetPassword'
import NotFound from './views/NotFound'
// import API from './utils/API'

function App() {
  /** Initialize authenticated status */
  const hasToken = localStorage.getItem('hetic_student_token') ? true : false
  const [isAuth, setAuth] = useState(hasToken)
  
  const handleLogin = (bool) => {
    setAuth(bool)
  }

  if(!isAuth) {
    return (
      <div className="App">
        <Login handleLogin={handleLogin}></Login>
      </div>
    )
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <div className='wrapper'>
          <Switch>
            <Route
              exact
              path='/'
              component={Profile}></Route>
            <Route
              exact
              path='/reset-password'
              component={ResetPassword}></Route>
            <Route
              exact
              path='/list'
              component={List}></Route>
            {/* <Route component={NotFound}></Route> */}
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
