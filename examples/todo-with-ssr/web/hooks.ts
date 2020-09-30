import {resource, action} from 'react-distant'
import * as api from './api'

export const useTasks = resource('tasks', api.all)
export const useAddTask = action(api.add)
export const useEditTask = action(api.edit)
export const useRemoveTask = action(api.remove)
