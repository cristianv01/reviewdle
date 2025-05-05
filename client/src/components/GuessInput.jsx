import React, {useState} from "react";

function GuessInput({onSubmit, guessesLeft}){
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(inputValue.trim() && guessesLeft > 0){
            onSubmit(inputValue);
            setInputValue('');
        }
    };

    const handleInputChange = (e) =>{
        setInputValue(e.target.value);
    }

    const isGameOver = guessesLeft <= 0


    return (
        <div className="input-area">
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter movie title"
                    disabled={isGameOver}
                    aria-label="Enter movie title guess"
                ></input>
                <button type="submit" disabled={isGameOver || !inputValue.trim()}>
                    Guess ({guessesLeft})
                </button>
            </form>
        </div>
    )
}

export default GuessInput;