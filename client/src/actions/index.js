import axios from 'axios';
import { API_ADDRESS } from './globalVars'


export const addSocket = socket => ({type: 'ADD_SOCKET', payload: socket})  

export const addPlayer = player => ({type: 'ADD_PLAYER', payload: player})  

export const playerReady = player => ({type: 'PLAYER_READY', payload: player})  

export const allNotReady = () => ({type: 'ALL_NOT_READY'})  

export const addAnswer = answer => ({type: 'ADD_ANSWER', payload: answer})

export const getAnswers = gameId => {
    return async (dispatch) => {
        try {
            const res = await fetch(`${API_ADDRESS}/games/${gameId}`)
            const data = await res.json()
            let newQuestions = data.questions.map(question => question)
            console.log(newQuestions)
            dispatch({
                type: 'LOAD_QUESTIONS',
                payload: newQuestions
            })
        } catch (err) {
            dispatch({
                type: 'SET_ERROR',
                payload: err
            })
        }
    }
}
