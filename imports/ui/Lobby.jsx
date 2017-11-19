import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Lobby extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        Meteor.call('games.start', this.props.gameId);
    }

    renderPlayers() {
        const playerNames = this.props.playerNames;

        return playerNames.map((player, i) => {
            return (
                <li key={i}>
                    <b>{i+1}</b>  {player}
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <form className="start" onSubmit={this.handleSubmit} >
                    <input
                        type="submit"
                        value="Start Game"
                    />
                    {this.props.gameId}
                </form>
                <ul>
                    {this.renderPlayers()}
                </ul>
            </div>
        );
    }
}