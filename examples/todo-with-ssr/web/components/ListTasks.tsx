import React from 'react'
import {useTasks} from '../hooks'
import {ShowTask} from './ShowTask'

export function ListTasks() {
  const tasks = useTasks()
  return (
    <>
      {tasks.hasError && <div className="warning">Error happened while loading tasks!</div>}
      {tasks.hasBeenLoaded && tasks.data?.map((task) => <ShowTask key={task.id} task={task} />)}
    </>
  )
}
