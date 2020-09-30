import React from 'react'
import {useAddTask, useTasks} from '../hooks'

export function AddTask() {
  const [value, setValue] = React.useState('')
  const tasks = useTasks()
  const add = useAddTask({
    onSuccess: () => {
      tasks.reload()
      setValue('')
    },
  })
  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      add.run({content: value, completed: false})
    }
  }
  return (
    <>
      {add.hasError && <div className="warning">Error while adding the task!</div>}
      <input
        className="input"
        placeholder="new task ..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={onKeyPress}
      />
    </>
  )
}
