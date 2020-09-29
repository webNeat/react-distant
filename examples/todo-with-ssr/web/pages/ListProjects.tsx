import React from 'react'
import {Link} from 'react-router-dom'
import {useRefresh} from 'react-tidy'
import {useGet} from 'react-distant'
import {Project} from '../types'

export function ListProjects() {
  const refresh = useRefresh()
  const state = useGet<Project[]>('/projects')
  return (
    <>
      <div>
        <Link to="/projects/add">Add Project</Link>
      </div>
      {!state.hasBeenLoaded && <div>Loading ...</div>}
      {state.hasBeenLoaded &&
        state.data?.map((project) => (
          <section key={project.id}>
            <Link to={'/projects/' + project.id}>
              <h1>{project.name}</h1>
            </Link>
            <p>{project.description}</p>
          </section>
        ))}
    </>
  )
}
