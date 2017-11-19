import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Start extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playerName: '',
            gameId: '',
            newGame: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleGameIdChange = this.handleGameIdChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleGameIdChange(event) {
        this.setState({
            gameId: event.target.value.toUpperCase()
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.playerName === "") {
            alert("Enter player name");
            return;
        }
        if (this.state.newGame) {
            Meteor.call('games.insert', Session.get("_id"), this.state.playerName);
            this.props.setScreen('lobby');
        } else {
            if (this.state.gameId.length !== 5) {
                alert("Enter valid Game ID");
                return;
            }
            Meteor.call('games.join', this.state.gameId, Session.get("_id"), this.state.playerName);
            this.props.setScreen('lobby');
        }
    }

    render() {
        return (
            <div>
                <form className="start" onSubmit={this.handleSubmit} >
                    <input
                        name="playerName"
                        type="text"
                        placeholder="Player name"
                        value={this.state.playerName}
                        onChange={this.handleChange}
                    />
                    <br />
                    <input
                        name="gameId"
                        type="text"
                        placeholder="Game ID"
                        value={this.state.gameId}
                        onChange={this.handleGameIdChange}
                    />
                    <label>
                        <input
                            name="newGame"
                            type="checkbox"
                            value={this.state.newGame}
                            onChange={this.handleChange}
                        />
                        New game
                    </label>
                    <br />
                    <input
                        type="submit"
                        value="Start"
                    />
                </form>
            </div>
        );
    }
}
