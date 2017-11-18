import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

export default class Player extends Component {
  render() {
    return (
      <li>
        <span className="text">
          <strong>Player {this.props.player.number}</strong>: {this.props.player.name}
        </span>
      </li>
    );
  }
}
