import { useState } from 'react'
import Game from './Game'
import { useQuery } from '@apollo/client'
import { GET_ALL_MOVIE_IDS_QUERY } from '../api/queries'
import '../styles/App.css'

function App() {

  const [movieIds, setMovieIds] = useState([]);
  const [currentMovieIdx, setCurrentMovieIdx] = useState(0);
  const [idFetchStatus, setIdFetchStatus] = useState('loading');
  const [showRules, setShowRules] = useState(true);
  // const [count, setCount] = useState(1)
  // const [movieId,setMovieId] = useState(`movie1`)

  // eslint-disable-next-line no-unused-vars
  const {loading, error, data} = useQuery(GET_ALL_MOVIE_IDS_QUERY, {
    onCompleted: (fetchedData) =>{
      if (fetchedData.getAllMovieIds && fetchedData.getAllMovieIds.length > 0){
        setMovieIds(fetchedData.getAllMovieIds);
        setIdFetchStatus('success');
      }else{
        setMovieIds([]); // Ensure it's an empty array if nothing found
        setIdFetchStatus('error'); // Treat empty list as an error for now
      }
    }
  });


  const goNext = () =>{
    if(currentMovieIdx < movieIds.length - 1){
      setCurrentMovieIdx(prev => prev + 1);
    }else{
      console.log("all movies completed")
    }
  };
  
  const handleCloseRules = () =>{
    setShowRules(false);
  };

  const currentMovieId = movieIds.length > 0 && idFetchStatus === 'success'
    ? movieIds[currentMovieIdx] : null;

  //Render
  
  // Handle loading state for fetching IDs
  if (idFetchStatus === 'loading') {
    return (
      <div className="App">
        <h1>Guess the Movie!</h1>
        <p>Loading movie list...</p>
      </div>
    );
  };

  // Handle error state for fetching IDs
  if (idFetchStatus === 'error') {
    return (
      <div className="App">
        <h1>Guess the Movie!</h1>
        <p>Error loading movie list. Please try refreshing.</p>
      </div>
    );
  };

  return (
    <>
      <div className='App'>
        <h1>Reviewdle</h1>
        <h2>The Review Guessing Game</h2>
        {currentMovieId ? (
          <Game key={currentMovieId} movieId={currentMovieId} onGameComplete={goNext}  showInitialRules={showRules} onCloseRules={handleCloseRules}/>
        ):( <p>Loading game...</p>)}
      </div>
    </>
  );
}

export default App;
