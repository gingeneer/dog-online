import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Lobby extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {


    }

    renderPlayers() {
        return (
          <li>yes this is lobby</li>
        );
    }

    render() {
        return (
            <div>
                <ul>
                    {this.renderPlayers()}
                </ul>
            </div>
        );
    }
}