import React, { useEffect, useState } from 'react';
import { ScoreView } from '../../components';
import axios from 'axios'
import { API_ADDRESS } from '../../actions/globalVars';

const Highscore = () => {
  const [players, setPlayers] = useState([])
useEffect(() => {
  async function getScores(){
  const { data } = await axios.get(`${API_ADDRESS}/games/scores`)
  const topPlayers = data.scores.sort((a,b) => b.points-a.points).map(p => ({name: p.username ? p.username : `Guest-${p.player}`, icon: p.icon, count: p.points}))
  topPlayers.length = 10
  setPlayers(topPlayers)
  }
  getScores()
},[])
  return (
    <main id="highscore" className="container">
      <h1>Highscores</h1>
      <ScoreView players={players}/>
    </main>
  );
}

export default Highscore;