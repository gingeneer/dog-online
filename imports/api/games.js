import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';

export const Games = new Mongo.Collection('games');

if (Meteor.isServer) {
  Meteor.publish('games', function gamesPublication() {
    return Games;
  });
}

Meteor.methods({
  'games.insert'(sessionId, playerName) {
    Games.insert({
      _id: Random.id(5),
      playerSessionIds: [sessionId],
      playerNames: [playerName]
    });
  },
  'games.remove'(gameId) {
    // TODO check if player part of game
    Games.remove(gameId);
  },
});
