import React from 'react';
import { useHistory } from 'react-router-dom';

const HighscoreButton = () => {

        const history = useHistory(); 
        
        function handleClick(e) {
            e.preventDefault()
            history.push("/highscore");
        }

    return <a href="/" onClick={handleClick} className="highscore-button">View Highscores</a>
}

export default HighscoreButton;