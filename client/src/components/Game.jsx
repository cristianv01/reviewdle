// src/components/Game.jsx
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MOVIE_QUERY } from '../api/queries'; // Correct path if needed
import Modal from './Modal'; // Correct path if needed
import GuessInput from './GuessInput'; // Correct path if needed
import ResultDisplay from './ResultDisplay'; // Correct path if needed
import ReviewsList from './ReviewsList'; // Correct path if needed
import '../styles/Game.css';
import '../styles/Modal.css'; // Keep modal styles

// Accept new props: showInitialRules, onCloseRules
function Game({ movieId, onGameComplete, showInitialRules, onCloseRules }) {
  // State Variables
  const [guessesLeft, setGuessesLeft] = useState(4);
  const [currentReview, setCurrentReview] = useState(0); // Index of next review
  const [revealedReviews, setRevealedReviews] = useState([]);
  // Default status is now 'loading' or 'playing', not 'modal'
  const [gameStatus, setGameStatus] = useState('loading');
  const [movieData, setMovieData] = useState(null);

  // Data Fetch
  const { loading, error } = useQuery(GET_MOVIE_QUERY, {
    variables: { id: movieId },
    skip: !movieId,
    onCompleted: (fetchedData) => {
      console.log('FETCHED DATA in onCompleted:', JSON.stringify(fetchedData, null, 2));
      if (fetchedData?.getMovie) {
        setMovieData(fetchedData.getMovie);
        // Reset state for the new game
        setGuessesLeft(4);
        setCurrentReview(0);
        setRevealedReviews([]);
        // --- Don't set to 'modal' here ---
        // If rules modal isn't showing, start playing, otherwise wait for it to close
        setGameStatus(showInitialRules ? 'loading' : 'playing'); // Or just 'playing' if rules modal doesn't pause game load
      } else {
        console.error('Movie data not found for ID:', movieId);
        setGameStatus('error');
      }
    },
    onError: (fetchError) => {
      console.error('Error fetching movie:', fetchError);
      setGameStatus('error');
    },
    fetchPolicy: 'network-only'
  });

  // useEffect to reveal first review
  useEffect(() => {
    console.log("EFFECT CHECK: Status:", gameStatus, "Has movieData:", !!movieData, "Revealed length:", revealedReviews.length);
    // Only reveal first review if status is 'playing'
    if (gameStatus === 'playing' && movieData && revealedReviews.length === 0) {
      if (movieData.reviews && movieData.reviews.length > 0) {
        console.log("EFFECT ACTION: Attempting to set first review:", movieData.reviews[0]?.text);
        setRevealedReviews([movieData.reviews[0].text]);
        setCurrentReview(1);
      } else {
        console.log("EFFECT INFO: No reviews found in movieData for initial reveal.");
      }
    }
  }, [gameStatus, movieData, revealedReviews]);

  // Helpers

  // Function called when the rules modal is closed
  const handleRulesModalClose = () => {
      if (typeof onCloseRules === 'function') {
          onCloseRules(); // Call the function passed from App to update state there
      }
      // Set game status to playing *after* rules are closed
      if (movieData) { // Ensure data is loaded before playing
        setGameStatus('playing');
      }
  };

  const revealNextReview = () => {
    if (movieData?.reviews && currentReview < movieData.reviews.length) {
      console.log(`REVEAL ACTION: Revealing review index ${currentReview}:`, movieData.reviews[currentReview]?.text);
      setRevealedReviews(prev => [...prev, movieData.reviews[currentReview].text]);
      setCurrentReview(prev => prev + 1);
    } else {
      console.log(`REVEAL INFO: Cannot reveal review. Index: ${currentReview}, Reviews available: ${movieData?.reviews?.length}`);
    }
  };

  const handleGuess = (guess) => {
    if (!movieData || gameStatus !== 'playing') {
      return;
    }
    const formatGuess = guess.trim().toLowerCase();
    const correctTitle = movieData.title.trim().toLowerCase();
    if (formatGuess === correctTitle) {
      setGameStatus('won');
    } else {
      const newGuessesLeft = guessesLeft - 1;
      setGuessesLeft(newGuessesLeft);
      if (newGuessesLeft <= 0) {
        setGameStatus('lost');
      } else {
        console.log("ACTION: Calling revealNextReview from handleGuess (incorrect)");
        revealNextReview();
      }
    }
  };

  // Rendering
  // Show loading if Apollo is loading OR if gameStatus is loading (waiting for rules modal)
  if (loading || (gameStatus === 'loading' && !showInitialRules)) { // Adjust loading logic slightly
    return <p>Loading game data...</p>;
  }
  if (error || gameStatus === 'error') {
    return <p>Error loading game. Please check connection or try again later</p>;
  }
  // Don't render main game if rules are showing OR if data isn't ready
  const shouldRenderGame = !showInitialRules && movieData && gameStatus !== 'loading';

  return (
    <div className='game-container'>
      {/* --- Rules Modal (controlled by prop) --- */}
      <Modal isOpen={showInitialRules} onClose={handleRulesModalClose}>
        <h2>How to Play</h2>
        <p>Guess the movie based on the Letterboxd reviews</p>
        <p>You get up to 4 guesses, with each guess revealing a new review of decreasing difficulty</p>
        <p>Enter the full movie title to guess</p>
        <p>4 hand picked new movies are cycled every other day (12AM EST)</p>
        <p>Future Features: Past Puzzle Archives, Personal History, Layout Improvements</p>
        {/* Use the new close handler */}
        <button onClick={handleRulesModalClose} className='modal-start-button'>Start Game</button>
      </Modal>

      {/* --- Game Area --- */}
      {/* Render only if rules are closed and data is loaded */}
      {shouldRenderGame && (
        <>
          <ReviewsList reviews={revealedReviews} />

          {gameStatus === 'playing' && (
            <GuessInput
              onSubmit={handleGuess}
              guessesLeft={guessesLeft} />
          )}

          {(gameStatus === 'won' || gameStatus === 'lost') && (
            <ResultDisplay
              className='result-area'
              status={gameStatus}
              movie={movieData}
              onGameComplete={onGameComplete} // Pass the callback down
            />
          )}
        </>
      )}
    </div>
  );
}

export default Game;
