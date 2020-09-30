import {Router} from 'express'
import {Task} from '../types'

const router = Router()

const tasks: {[key: number]: Task} = {
  1: {
    id: 1,
    content: 'First task',
    completed: true,
  },
  2: {
    id: 2,
    content: 'Second task',
    completed: false,
  },
}
let nextId = 3

router.get('/tasks', (req, res) => res.json(Object.values(tasks)))
router.post('/tasks', (req, res) => {
  const task = {...req.body, id: nextId++}
  tasks[task.id] = task
  res.json(task)
})
router.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id)
  if (!tasks[id]) {
    return res.status(404).json({error: 'Task not found!'})
  }
  tasks[id] = {...tasks[id], ...req.body}
  res.json(tasks[id])
})
router.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id)
  if (!tasks[id]) {
    return res.status(404).json({error: 'Task not found!'})
  }
  delete tasks[id]
  res.json({})
})

export default router
