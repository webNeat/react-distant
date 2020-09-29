import axios from 'axios'
import {Task} from './types'

export async function list() {
  const res = await axios.get(`/api/tasks`)
  return res.data as Task[]
}

export async function get(id: number) {
  const res = await axios.get(`/api/tasks/${id}`)
  return res.data as Task
}

type AddFields = Omit<Task, 'id'>
export async function add(fields: AddFields) {
  const res = await axios.post('/api/tasks', fields)
  return res.data as Task
}

type EditFields = Partial<AddFields>
export async function edit(id: number, fields: EditFields) {
  const res = await axios.put(`/api/tasks/${id}`, fields)
  return res.data as Task
}

export async function remove(id: number) {
  const res = await axios.delete(`/api/tasks/${id}`)
  return res.data
}
