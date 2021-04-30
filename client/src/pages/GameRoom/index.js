import React, { useState, useEffect } from'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { PlayerCard, Options } from '../../components'
import { getAnswers, allNotReady } from '../../actions'
import { API_ADDRESS } from '../../actions/globalVars';

import { getIcon } from '../../actions/getIcon';

import { useTheme } from '../../customHooks'

import planet1 from '../../images/planet-1.png'
import planet2 from '../../images/planet-2.png'
import planet3 from '../../images/planet-3.png'


const GameRoom = () => {
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()

  const [blueTheme, setBlueTheme] = useState('position1');
  const [purpleTheme, setPurpleTheme] = useState('position3');
  const [pinkTheme, setPinkTheme] = useState('position2');

  const [planetSelectTheme, setPlanetSelectTheme] = useState('planet-select-blue');

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

    useEffect(() => {
      let question = currentQuestion;
      if (question % 3 === 2) {
        console.log('Test 3')
        setBlueTheme("position3");
        setPurpleTheme("position1");
        setPinkTheme("position2");
        setPlanetSelectTheme("planet-select planet-select-purple");
      } else if (question % 3 === 1) {
        console.log('Test 2')
        setBlueTheme("position2");
        setPurpleTheme("position3");
        setPinkTheme("position1");
        setPlanetSelectTheme("planet-select planet-select-pink");
      } else {
        console.log('Test 1')
        setBlueTheme("position1");
        setPurpleTheme("position2");
        setPinkTheme("position3");
        setPlanetSelectTheme("planet-select planet-select-blue");
      }
    },[currentQuestion])
  
    const returnPlayer = currentPlayers.map((p, i) => {
        return <PlayerCard key={i} player={p.player.id} username={p.player.username} me={p.player.id === socket.socket.id} icon={getIcon(p.player.icon)} ready={p.ready} />
    });
  

    return (
      <section style={{ color: "white" }} id="game-room" className={setTheme}>
        <div class="container">
          <div id="App">Room: {id}</div>
          <div className="planets">
            <span className={planetSelectTheme}></span>
            <img className={blueTheme} src={planet1} alt="Planet 1" />
            <img className={pinkTheme} src={planet2} alt="Planet 2" />
            <img className={purpleTheme} src={planet3} alt="Planet 3" />
          </div>
          { questions ?
            <div>
              <div className="text-center">
                <h3>QUESTION {currentQuestion+1}</h3>
                <h1>{renderHTML(questions[currentQuestion].question)}</h1>
              </div>
              <Options options={questions[currentQuestion].possible_answers} disabled={disabled} setDisabled={setDisabled}/>
              {returnPlayer}
            </div>
          :
            null }
        </div>
      </section>
    );

}

export default GameRoom;