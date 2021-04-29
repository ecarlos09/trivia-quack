import React, { useEffect, useState } from 'react';
import { PlayerCard } from '../../components';
import io from 'socket.io-client';
import axios from 'axios'

import { addPlayer, playerReady, addSocket, allNotReady } from '../../actions'

import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import icon1 from '../../images/player-1.png';
import icon2 from '../../images/player-2.png';
import icon3 from '../../images/player-3.png';
import icon4 from '../../images/player-4.png';
import icon5 from '../../images/player-5.png';
import icon6 from '../../images/player-6.png';
import icon7 from '../../images/player-7.png';
import icon8 from '../../images/player-8.png';
import icon9 from '../../images/player-9.png';
import icon10 from '../../images/player-10.png';

const Lobby = () => {
  // const [socket, setSocket] = useState(null);
  const [gameInfo, setGameInfo] = useState(null)

  const { id } = useParams()
  const history = useHistory()
  console.log(id)
  const dispatch = useDispatch()
  const serverEndpoint = "http://localhost:5001"

  const currentPlayers = useSelector(state => state.myReducer.players)
  const socket = useSelector(state => state.myReducer.socket)



  useEffect(() => {
    const socket = io(serverEndpoint);
    dispatch(addSocket({ socket }))
    // setSocket({ socket });
    socket.emit("create", id);

    socket.on("players-in-room", (list) => {
      console.log(list)
      dispatch(addPlayer(list))
    });

    socket.on("player-ready", (socket) => {
      dispatch(playerReady(socket))
    });

    async function fetchInfo(){
    const { data } = await axios.get(`http://localhost:3000/games/${id}/simple`)
    setGameInfo(data)
    }
    fetchInfo()
  },[])

  useEffect(() => {
    if (currentPlayers.length > 0 && currentPlayers.every(player => player.ready === true)) {
      setTimeout(axios.post(`http://localhost:3000/games/${id}/players/${socket.socket.id}`, Math.random * 3000))
      history.push(`/game/${id}`)
      dispatch(allNotReady())
    }
  },[currentPlayers])

  function handleReady(){
    socket.socket.emit("ready", socket.socket.id)
  }

  // const fakePlayers = ["123123", "213424", "234234", "234345"];
  
  const icons = [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, icon9, icon10];

  const returnIcon = () => {
    let icon = icons[Math.floor(Math.random() * icons.length)];
    return icon;
  }

  const readyMarker = false;

  const returnPlayer = currentPlayers.map(player => {
      return <PlayerCard player={player.player} me={player.player === socket.socket.id} icon={returnIcon()} ready={player.ready} />
  });

  return (
    <main id="lobby" className="container">
      {gameInfo && (
        <section style={{color: 'white'}}>
          <p>Category: {gameInfo.category}</p>
          {/* <p>Difficulty: {gameInfo.difficulty}</p> */}
          <p>Type: {gameInfo.type}</p>
          <p>Length: {gameInfo.length}</p>
        </section>
      )}

      <div className="row">
        <div className="col-md-6 text-center align-self-center">
          <button onClick={handleReady} className="ready-button">
            Ready Up
          </button>
        </div>
        <div className="col-md-6">
          <h3>Player List:</h3>
          {returnPlayer}
        </div>
      </div>
    </main>
  );
};

export default Lobby;