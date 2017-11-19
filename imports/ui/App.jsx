import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Random } from 'meteor/random';

import { Games } from '../api/games.js';
import { Boards } from '../api/boards.js';

import Start from './Start.jsx';
import Lobby from './Lobby.jsx';
import Board from './Board.jsx';

class App extends Component {
    constructor(props) {
        super(props);

        Session.set({ _id: Random.id()});

        this.state = {
            sessionId: Session.get("_id"),
            screen: 'start',
        };

        this.setScreen = this.setScreen.bind(this)
    }

    setScreen(screenName) {
        this.setState({ screen: screenName });
    }

    renderStart() {
        if (this.state.screen === 'start') {
            return (
                <Start
                    setScreen={this.setScreen}
                />
            );
        }
    }

    renderLobby() {
        if (this.state.screen === 'lobby') {
            const sessionId = this.state.sessionId;
            const game = Games.findOne({ sessionIds: sessionId });
            const gameId = game._id;
            const playerNames = game.playerNames;

            if (game.started === 1) {
                this.setScreen('board');
            }

            return (
                <div>
                    <Lobby
                        gameId={gameId}
                        playerNames={playerNames}
                        setScreen={this.setScreen}
                    />
                </div>
            );
        }
    }

    renderBoard() {
        if (this.state.screen === 'board') {
            return (
                <Board />
            );
        }
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Dog Online</h1>
                </header>
                {this.renderStart()}
                {this.renderLobby()}
                {this.renderBoard()}
            </div>
        );
    }
}

App.propTypes = {
    games: PropTypes.array.isRequired,
};

export default App = withTracker(() => {
    Meteor.subscribe('games');

    return {
        games: Games.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
})(App);
