import React from 'react'
import { Switch, Route } from 'react-router-dom';
import { Homepage, Lobby, Create, Result, Highscore, GameRoom, JoinRoom } from './pages';

const App = () => {
    return (
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>
                <Route path="/create">
                    <Create />
                </Route>
                <Route path="/join">
                    <JoinRoom />
                </Route>
                <Route path="/lobby/:id">
                    <Lobby />
                </Route>
                <Route path="/game/:id">
                    <GameRoom />
                </Route>
                <Route path="/results/:id">
                    <Result />
                </Route>
                <Route path="/highscore">
                    <Highscore />
                </Route>
            </Switch>
    )
}

export default App