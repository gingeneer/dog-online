import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Boards = new Mongo.Collection('boards');

if (Meteor.isServer) {
  Meteor.publish('boards', function boardsPublication() {
    return Boards.find({});
  });
}
