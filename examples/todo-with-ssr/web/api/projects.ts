import axios from 'axios'
import {Project} from './types'

export async function list() {
  const res = await axios.get(`/api/projects`)
  return res.data as Project[]
}

export async function get(id: number) {
  const res = await axios.get(`/api/projects/${id}`)
  return res.data as Project
}

type AddFields = Omit<Project, 'id'>
export async function add(fields: AddFields) {
  const res = await axios.post('/api/projects', fields)
  return res.data as Project
}

type EditFields = Partial<AddFields>
export async function edit(id: number, fields: EditFields) {
  const res = await axios.put(`/api/projects/${id}`, fields)
  return res.data as Project
}

export async function remove(id: number) {
  const res = await axios.delete(`/api/projects/${id}`)
  return res.data
}
