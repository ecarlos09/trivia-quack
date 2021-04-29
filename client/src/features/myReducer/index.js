function myReducer (state = {players: [], answers: []}, action) {
    switch (action.type) {
      case 'ADD_SOCKET':
        return ({
          ...state,
          socket: action.payload
        })
      case 'ADD_PLAYER':
        return ({
            ...state,
            players: action.payload.map(player => ({player: player, ready: false}))
        })
          case 'PLAYER_READY':
            const playerToToggle = state.players.find(p => p.player === action.payload)
            const likeIdx = state.players.indexOf(playerToToggle)
            const updatedPlayers = [ 
                ...state.players.slice(0, likeIdx),
                { ...playerToToggle, ready: !playerToToggle.ready },
                ...state.players.slice(likeIdx+1)
            ]
            return { ...state, players: updatedPlayers }
            case 'ALL_NOT_READY':
              const unReadyPlayers = [ 
                ...state.players.map(p => ({player: p.player, ready: false}))
              ]
              return {
                ...state, players: unReadyPlayers 
              }
      case 'LOAD_QUESTIONS':
        return ({
          ...state,
          questions:[...action.payload],
        }) 
      case 'ADD_ANSWER':
        return ({
          ...state,
          answers: state.answers.concat([action.payload])
        })
      case 'SET_ERROR' :
        return 'error'
      case 'ADD_MESSAGE':
        console.log(action.payload)
        return state
      default:
        return state
    }
  };

export default myReducer