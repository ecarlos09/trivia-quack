import React, { useEffect, useState } from 'react';
import { PlayerCard } from '../../components';
import io from 'socket.io-client';
import axios from 'axios'
import { API_ADDRESS, SOCKET_ADDRESS } from '../../actions/globalVars';

import { addPlayer, playerReady, addSocket, allNotReady } from '../../actions'

import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import { getIcon } from '../../actions/getIcon'

const Lobby = () => {
  const [gameInfo, setGameInfo] = useState(null)

  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const serverEndpoint = `${SOCKET_ADDRESS}`

  const currentPlayers = useSelector(state => state.myReducer.players)
  const socket = useSelector(state => state.myReducer.socket)



  useEffect(() => {
    const socket = io(serverEndpoint);
    dispatch(addSocket({ socket }))
    socket.emit("create", id);

    socket.on("players-in-room", (list) => {
      dispatch(addPlayer(list))
    });

    socket.on("player-ready", (socket) => {
      dispatch(playerReady(socket))
    });

    async function fetchInfo(){
    const { data } = await axios.get(`${API_ADDRESS}/games/${id}/simple`)
    setGameInfo(data)
    }
    fetchInfo()
  },[])

  useEffect(() => {
    if (currentPlayers.length > 0 && currentPlayers.every(player => player.ready === true)) {
      // axios.post(`${API_ADDRESS}/games/${id}/players/${socket.socket.id}`)
      history.push(`/game/${id}`)
      dispatch(allNotReady())
    }
  },[currentPlayers])

  function handleReady(){
    socket.socket.emit("ready", socket.socket.id)
  }

  function handleUsername(){
    socket.socket.emit("username", username)
  }

  const returnPlayer = currentPlayers.map((p, i) => {
      return <PlayerCard key={i} player={p.player.id} username={p.player.username} me={p.player.id === socket.socket.id} icon={getIcon(p.player.icon)} ready={p.ready} />
  });

  const [username, setUsername] = useState("")
  return (
    <main id="lobby" className="container">
      {gameInfo && (
        <section style={{color: 'white'}}>
          <p>Category: {gameInfo.category}</p>
          <p>Type: {gameInfo.type}</p>
          <p>Length: {gameInfo.length}</p>
          <p>Game ID: {id}</p>
          <input type="text" value={username} placeholder={"set username..."} onChange={(e) => setUsername(e.target.value)}/>
          <button onClick={handleUsername}>set</button>
        </section>
      )}

      <div className="row">
        <div className="col-md-6 text-center align-self-center">
          <button onClick={handleReady} className="ready-button">
            Ready Up
          </button>
          <h3>Copy URL or Game ID to invite more participants</h3>
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