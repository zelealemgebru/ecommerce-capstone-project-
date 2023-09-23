import React, { useEffect, useState } from 'react'
import '../style/index.css'

const App = () => {
  const [fakestore, setfakestore] = useState([])

  useEffect(() => {
    const getAllData = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com`)
        const { results } = await response.json()
        setfakestore(results)
      } catch (err) {
        console.error(err)
      }
    }
    getAllData()
  }, [])

  return (
    <div>
      <p>ecommerce</p>
      {!!fakestore.length &&
        fakestore.map((el, i) => {
          return (
            <div key={i}>
              <h1>{el.name}</h1>
            </div>
          )
        })}
    </div>
  )
}

export default App
