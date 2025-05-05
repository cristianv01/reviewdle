import React from "react";

function ResultDisplay({status, movie, className, onGameComplete}){
    const message = status === 'won' ? 'Correct!' : 'Out of guesses! The movie was:';


    if(!movie){
        return <div className="result-area"><p>Game over. Loading result...</p></div>
    }

    const handleNextClick = () => {
        if (typeof onGameComplete === 'function'){
            onGameComplete();
        }
    }

    return (
        <div className={className || 'result-area'}>
            <h2>{message}</h2>
            {status === 'lost' && <h3>{movie.title}</h3>}
            {movie.posterURL ?(
                <img src={movie.posterURL}
                style={{ maxWidth: '200px', display: 'block', margin: '10px auto' }}
                />
                
            ): (
                <p>[No Poster Available]</p>
            )}
             <button onClick={handleNextClick} className="next-movie-button">
                Next Movie
            </button>
        </div>

    )
}

export default ResultDisplay;