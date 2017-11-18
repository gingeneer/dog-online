import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Players = new Mongo.Collection('players');

if (Meteor.isServer) {
  Meteor.publish('players', function playersPublication() {
    return Players;
  });
}
