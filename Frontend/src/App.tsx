import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('http://localhost:3000/measurements').then(response => {
        console.log(response.data);
        setValue(response.data[0].light)
      })
    }, 10000)
    return () => clearInterval(interval);
  }, [])

  return (
    <>
      <div className="card">
        <h2>Light</h2>
        <p>{value}</p>
      </div>
    </>
  )
}

export default App
