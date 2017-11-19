import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        // this.handleSubmit = this.handleSubmit.bind(this)
    }

    render() {
        return (
            <div>this is board</div>
        );
    }
}