export type Project = {
  id: number
  name: string
  description: string
}

export type Task = {
  id: number
  project_id: number
  content: string
  completed: boolean
}
