import React from 'react'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'
import {usePost} from '../../../../src'
import {Project} from '../types'

export function AddProject() {
  const action = usePost('/projects')
  const {register, handleSubmit} = useForm<Omit<Project, 'id'>>()
  return (
    <>
      <div>
        <Link to="/projects">Back to Projects</Link>
      </div>
      {!action.isLoading && action.hasError && <div>Error happened!</div>}
      {!action.isLoading && !action.hasError && <div>Added successfully!</div>}
      <form onSubmit={handleSubmit(action.run)}>
        <input placeholder="project name" {...register('name')} />
        <br />
        <textarea placeholder="project description" {...register('description')} />
        <br />
        <button type="submit" disabled={action.isLoading}>
          Add
        </button>
      </form>
    </>
  )
}
