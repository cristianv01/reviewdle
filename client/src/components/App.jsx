import { useState } from 'react'
import Game from './Game'
import '../styles/App.css'

function App() {
  const [count, setCount] = useState(1)
  const [movieId,setMovieId] = useState(`movie1`)



  return (
    <>
      <div className='App'>
        <h1>Reviewdle: Guess the Movie</h1>
        {movieId ? (
          <Game key={movieId} movieId={movieId}/>
        ):( <p>Loading game...</p>)}
      </div>
       {/* <button onClick={selectNewMovie}>Next Game (Test)</button> */}
    </>
  )
}

export default App
