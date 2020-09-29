import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './App'
import axios from 'axios'
import {setAxiosInstance} from '../../../dist'

setAxiosInstance(
  axios.create({
    baseURL: 'http://localhost:3000/api',
  })
)

ReactDOM.render(<App />, document.getElementById('app'))
