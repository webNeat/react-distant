import React from 'react'
import {AddTask, ListTasks} from './components'

export function App() {
  return (
    <div className="container m-auto">
      <AddTask />
      <ListTasks />
    </div>
  )
}
