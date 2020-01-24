import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import './index.scss'
import Login from './views/Login'
import Header from './components/Header'
import Profile from './views/Profile'
import List from './views/List'
import ResetPassword from './views/ResetPassword'
import NotFound from './views/NotFound'
import variables from './global/variables.scss'
// import API from './utils/API'

const AppContainer = styled.div`
  position: relative;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  background: ${({ isAdmin }) => (isAdmin ? variables.blue : variables.orange)};
`

function App() {
  /** Initialize authenticated status */
  const hasToken = localStorage.getItem('hetic_student_token') ? true : false
  const [isAuth, setAuth] = useState(hasToken)
  const [isAdmin, setIsAdmin] = useState(false)
  
  const handleLogin = (bool) => {
    setAuth(bool)
  }

  const handleClick = () => {
    setIsAdmin(!isAdmin)
  }

  if(!isAuth) {
    return (
      <AppContainer isAdmin={isAdmin}>
        <Login
          isAdmin={isAdmin}
          handleLogin={handleLogin}
          handleClick={handleClick}></Login>
      </AppContainer>
    )
  }

  return (
    <AppContainer isAdmin={isAdmin}>
      <BrowserRouter>
        <Header />
        <div className='wrapper'>
            <Route
              exact
              path='/'
              render={() => <Profile isAdmin={isAdmin} />}></Route>
            <Route
              exact
              path='/reset-password'
              component={ResetPassword}></Route>
            <Route
              path='/list'
              component={List}></Route>
            {/* <Route component={NotFound}></Route> */}
        </div>
      </BrowserRouter>
    </AppContainer>
  )
}

export default App
