import React from 'react'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'
import {usePost} from 'react-distant'
import {Project} from '../types'

export function AddProject() {
  const action = usePost('/projects')
  const {register, handleSubmit} = useForm<Omit<Project, 'id'>>()
  const onSubmit = (data: Omit<Project, 'id'>) => {
    console.log(data)
  }
  return (
    <>
      <div>
        <Link to="/projects">Back to Projects</Link>
      </div>
      {action.hasBeenLoaded && !action.isLoading && action.hasError && <div>Error happened!</div>}
      {action.hasBeenLoaded && !action.isLoading && !action.hasError && <div>Added successfully!</div>}
      <form onSubmit={handleSubmit(action.run)}>
        <input placeholder="project name" name="name" ref={register} />
        <br />
        <textarea placeholder="project description" name="description" ref={register} />
        <br />
        <button type="submit" disabled={action.isLoading}>
          Add
        </button>
      </form>
    </>
  )
}
