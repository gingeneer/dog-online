import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Random } from 'meteor/random';

import { Games } from '../api/games.js';
import { Players } from '../api/players.js';

import Start from './Start.jsx';
import Lobby from './Lobby.jsx';

class App extends Component {
    constructor(props) {
        super(props);

        Session.set({ _id: Random.id()});

        this.state = {
            sessionId: Session.get("_id"),
            screen: 'start',
        };

        // this.setScreen(nextScreen) = this.setState( { screen: nextScreen } );
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this)
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
                    started? {game.started}
                </div>
            );
        }
    }

    renderBoard() {
        if (this.state.screen === 'board') {
            return (
                <div>
                    this is board
                </div>
            );
        } else {

        }
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.screen}<br/>
                    {/*{this.state.sessionId}<br/>*/}
                    {/*{this.state.playerName}<br/>*/}
                    {/*{this.state.gameId}<br/>*/}
                    {/*{this.state.newGame}<br/>*/}
                </div>
                <div className="container">
                    <header>
                        <h1>Dog Online</h1>
                    </header>
                    {this.renderStart()}
                    {this.renderLobby()}
                    {this.renderBoard()}
                </div>
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
