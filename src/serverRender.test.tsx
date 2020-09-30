import React from 'react'
import {wait} from './functions'
import {resource} from './resource'
import {serverRender} from './serverRender'

describe('serverRender', () => {
  const useNumbers = resource('numbers', async () => {
    wait(200)
    return [1, 2, 3, 4, 5]
  })
  const useSquares = resource('squares', async (numbers: number[]) => {
    wait(200)
    return numbers.map((x) => x * x)
  })
  const useIncrementAll = resource('incrementAll', async (numbers: number[]) => {
    wait(200)
    return numbers.map((x) => x + 1)
  })

  test(`renders html with simple resource`, async () => {
    function App() {
      const numbers = useNumbers()
      return <>{numbers.hasBeenLoaded && <p>{JSON.stringify(numbers.data)}</p>}</>
    }
    const [html] = await serverRender(<App />)
    expect(html).toBe('<p>[1,2,3,4,5]</p>')
  })

  test(`renders html with dependent resources`, async () => {
    function App() {
      const numbers = useNumbers()
      const squares = useSquares([numbers.data as number[]], {load: numbers.hasBeenLoaded})
      const incremented = useIncrementAll([squares.data as number[]], {load: squares.hasBeenLoaded})
      return <>{incremented.hasBeenLoaded && <p>{JSON.stringify(incremented.data)}</p>}</>
    }
    const [html] = await serverRender(<App />)
    expect(html).toBe('<p>[2,5,10,17,26]</p>')
  })
})
