import {resource, action} from 'react-distant'
import {tasks, projects} from './api'

export const useProjects = resource('projects:list', projects.list)
export const useProject = resource('projects:get', projects.get)
export const useAddProject = action(projects.add)
export const useEditProject = action(projects.edit)
export const useRemoveProject = action(projects.remove)

export const useTasks = resource('tasks:list', tasks.list)
export const useTask = resource('tasks:get', tasks.get)
export const useAddTask = action(tasks.add)
export const useEditTask = action(tasks.edit)
export const useRemoveTask = action(tasks.remove)
