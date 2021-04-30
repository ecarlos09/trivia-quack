import React, { useState, useEffect } from'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { PlayerCard, Options } from '../../components'
import { getAnswers, allNotReady } from '../../actions'
import { API_ADDRESS } from '../../actions/globalVars';

import { getIcon } from '../../actions/getIcon';

import { useTheme } from '../../customHooks'


const GameRoom = () => {
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()

  const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

  const currentPlayers = useSelector(state => state.myReducer.players)
  const socket = useSelector(state => state.myReducer.socket)
  const questions = useSelector(state => state.myReducer.questions)
  const answers = useSelector(state => state.myReducer.answers)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        dispatch(getAnswers(id))
    }, []);

    useEffect(() => {
      if (currentPlayers.length > 0 && currentPlayers.every(player => player.ready === true)) {
        if (currentQuestion < questions.length-1) {
          dispatch(allNotReady())
          setCurrentQuestion(q => q + 1)
          setDisabled(false);
        } else {
          const thisPlayer = currentPlayers.find(p => p.player.id === socket.socket.id)
          axios({
            method: 'post',
            url: `${API_ADDRESS}/games/${id}/players/${socket.socket.id}/answers`,
            data: { answers, icon: thisPlayer.player.icon, username: thisPlayer.player.username }
          });
          setTimeout(() => history.push(`/results/${id}`), 3000)
        }
      }
    },[currentPlayers])

    const setTheme = useTheme(currentQuestion);
  
    const returnPlayer = currentPlayers.map((p, i) => {
        return <PlayerCard key={i} player={p.player.id} username={p.player.username} me={p.player.id === socket.socket.id} icon={getIcon(p.player.icon)} ready={p.ready} />
    });
  

    return (
      <section style={{ color: "white" }} id="game-room" className={setTheme}>
        <div class="container">
          <div id="App">Room: {id}</div>
          <div className="planets">
            
          </div>
          { questions ?
            <>
              <div className="text-center">
                <h3>QUESTION {currentQuestion+1}</h3>
                <h1>{renderHTML(questions[currentQuestion].question)}</h1>
              </div>
              <Options options={questions[currentQuestion].possible_answers} disabled={disabled} setDisabled={setDisabled}/>
              {returnPlayer}
            </>
          :
            null }
        </div>
      </section>
    );

}

export default GameRoom;