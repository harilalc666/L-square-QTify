import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
    <h1>Counter App</h1>
    <p>Count: {count}</p>
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
    </>
  )
}

export default App
