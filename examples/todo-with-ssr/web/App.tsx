import React from 'react'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {ListProjects, AddProject} from './pages'

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/projects" exact component={ListProjects} />
        <Route path="/projects/add" exact component={AddProject} />
        <Redirect to="/projects" />
      </Switch>
    </BrowserRouter>
  )
}
