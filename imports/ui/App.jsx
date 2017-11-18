import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Random } from 'meteor/random';

import { Tasks } from '../api/tasks.js';
import { Games } from '../api/games.js';
import { Players } from '../api/players.js';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);


    Session.set({ _id: Random.id()})

    this.state = {
      sessionId: Session.get("_id"),
      playerName: '',
      gameId: '',
      newGame: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type == 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.newGame) {
      Meteor.call('games.insert');
      // TODO get gameId
      alert(this.state.sessionId);
    } else {
      alert("joingame");
    }
    Session.set({
      playerName: this.state.playerName,
      gameId: this.state.gameId
    });
  }

  submitJoinGame(event) {
    event.preventDefault();
    const gameId = ReactDOM.findDOMNode(this.refs.textInput).value.trim().toUpperCase();
    const playerName = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    if (gameId.length != 5) {
      alert("Enter valid Game ID")
    } else {
      // TODO enter game
      ReactDOM.findDOMNode(this.refs.textInput).value = '';
      alert(gameId);
      this.setState({
        screen: 'lobby',
      });
    };
  }

  renderStart() {
    return (
      <div>
        <form className="new-task" onSubmit={this.handleSubmit} >
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
            onChange={this.handleChange}
          />
          <label>
            New game
            <input
              name="newGame"
              type="checkbox"
              value={this.state.newGame}
              onChange={this.handleChange}
            />
          </label>
          <input
            type="submit"
            value="Start"
          />
        </form>
      </div>
    );
  }

  renderLobby() {
    if (false) {
      return (
        <div>
          <ul>
            <li>yes this is lobby</li>
          </ul>
        </div>
      );
    } else {
      return;
    }
  }

  renderBoard() {
    if (false) {
      return (
        <div>
          this is board
        </div>
      );
    } else {
      return;
    }
  }

  render() {
    return (
      <div>
      <div>
        {this.state.sessionId}<br/>
        {this.state.playerName}<br/>
        {this.state.gameId}<br/>
        {this.state.newGame}<br/>
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
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('games');

  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
}, App);
