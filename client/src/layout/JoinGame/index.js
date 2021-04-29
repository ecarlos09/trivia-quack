import React from 'react';
import { useHistory } from 'react-router-dom';

const JoinGame = () => {

        const history = useHistory(); 
        
        function handleClick(e) {
            e.preventDefault()
            history.push("/join");
        }

    return <a href="/" onClick={handleClick} className="join-game-button">Join Game</a>
}

export default JoinGame;