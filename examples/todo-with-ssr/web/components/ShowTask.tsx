import React from 'react'
import cn from 'classnames'
import {Task} from '../../types'
import {useEditTask, useRemoveTask, useTasks} from '../hooks'

type Props = {
  task: Task
}

export function ShowTask({task}: Props) {
  const tasks = useTasks()
  const edit = useEditTask({onSuccess: tasks.reload})
  const remove = useRemoveTask({onSuccess: tasks.reload})
  const toggle = () => edit.run(task.id, {completed: !task.completed})
  return (
    <div
      className={cn('flex border border-gray-400 rounded-lg m-3 p-3', {
        'bg-gray-200': remove.isLoading || edit.isLoading,
      })}
    >
      <p
        onClick={toggle}
        className={cn('flex-grow', {
          'line-through': task.completed,
        })}
      >
        {task.content}
      </p>
      <button onClick={() => remove.run(task.id)}>🗑️</button>
    </div>
  )
}
