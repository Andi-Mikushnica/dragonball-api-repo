import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [characters, setCharacters] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function getData(){
    try{
      const res = await fetch("https://dragonball-api.com/api/characters")
      if(!res.ok){
        throw new Error("Response invalid!")
      }
      const data = await res.json();
      return data;
    } catch (error){
      throw error;
    }
  }

  useEffect( () => {
    ( async () => {
      try {
        const data = await getData();
        setCharacters(data.items)
      } catch (error){
        setError(error)
      } finally{
        setLoading(false)
      }
    })();
    }
  , [])

  return (
  <>
  { error ? ( 
    <p>{error.message}</p>
  ) 
  : 
    isLoading ? (
    <p>Loading</p>
  ) : (
          <div className="container">
      <div className="title-div">
        <h1>DRAGON BALL API</h1>
      </div>
      <div className="character-cont">
        {characters[2].name}
      </div>
      <div className="input-div">
        <input type="text" placeholder="Enter a character here..." />
        <button></button>
      </div>
    </div>
    )
  }
  </>
    )
  
}

export default App
