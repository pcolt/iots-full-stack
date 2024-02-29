import { useState, useEffect } from 'react'
import axios from 'axios'
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2'
import './App.css'

// ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [value, setValue] = useState<number>(0)

  const chartJsData = {
    labels: ['Light', 'Dark'],
    datasets: [
      {
        label: 'Light',
        data: [value, 1023 - value],
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
      },
    ]
  }

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('http://localhost:3000/measures').then(response => {
        console.log(response.data);
        setValue(response.data[0].light)
      })
    }, 1000)
    return () => clearInterval(interval);
  }, [])

  return (
    <>
      <h2>Light Sensor</h2>
      <div>
        <Doughnut data={chartJsData} options={{
          rotation: -135,
          circumference: 275,
          plugins: {
            title: {
              display: true,
              text: `${value}/1023`,
              position: 'bottom',
              font: {
                size: 24
              },
              color: 'white'
            }
          }
        }}/>
      </div>
    </>
  )
}

export default App
