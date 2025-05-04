import React, {useState, useEffect} from 'react';



function Game({movieId}){

    const [guessesLeft, setGuessesLeft] = useState(4);
    const [currentReview, setCurrentReview] = useState(0);
    const [revealedReviews, setRevealedReviews] = useState([]);
    const [gameStatus, setGameStatus] = useState('loading'); // loading, modal, playing, won, lost
    const [movieData, setMovieData] = useState(null);

    return(
        <div>
            <h1>hello</h1>
        </div>
    );

}

export default Game;