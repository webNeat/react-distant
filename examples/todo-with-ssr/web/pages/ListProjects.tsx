import React from 'react'
import {Link} from 'react-router-dom'
import {useProjects} from '../hooks'

export function ListProjects() {
  const projects = useProjects()
  return (
    <>
      <div>
        <Link to="/projects/add">Add Project</Link>
      </div>
      {!projects.hasBeenLoaded && <div>Loading ...</div>}
      {projects.hasBeenLoaded &&
        projects.data?.map((project) => (
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
