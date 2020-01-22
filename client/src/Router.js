import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import App from './App'
import Profile from './views/Profile'
import ResetPassword from './views/ResetPassword'
// import NotFound from './views/NotFound'

function Router() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={App}></Route>
        <Route exact path='/reset-password' component={ResetPassword}></Route>
        <Route exact path='/profile' component={Profile}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </Router>
  )
}

export default Router
