import React from 'react'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {ListProjects} from './pages'

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/projects" exact component={ListProjects} />
        <Redirect to="/projects" />
      </Switch>
    </BrowserRouter>
  )
}
