import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [characters, setCharacters] = useState([])
  const [error, setError] = useState(null)

  async function getData(){
    try{
      const res = await fetch("https://dragonball-api.com/api/characters")
      if (!res.ok) setError(new Error("Faile to fetch characters!"))
      const data = await res.json()
      return data
    } catch(error){
      setError(error)
    }
  }

  useEffect(() => {
    getData().then( (data) => {
      if (data){
        console.log(data)
        setCharacters(data.items)
        setLoading(false)
      }
    })
  }, [])

  return (
    <div className="wrapper">
      { error ? (
        <p>{error.message} </p>
      ) : loading ? (
      <p>Loading..</p>
    ) : (
      <ul>
        {characters.map( (item, index) => 
        <li key={index} >
          {item.name} 
          <img  width="50px" height="75px" src={item.image} />
        </li>
      )}</ul>
    )}
    </div>
  )
}

export default App
