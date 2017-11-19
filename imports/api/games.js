import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';

export const Games = new Mongo.Collection('games');

// if (Meteor.isServer) {
//   Meteor.publish('games', function gamesPublication() {
//     // TODO ;
//   });
// }

Meteor.methods({
    'games.insert'(sessionId, playerName) {
        Games.insert({
            _id: Random.id(5).toUpperCase(),
            sessionIds: [sessionId],
            playerNames: [playerName]
        });
    },
    'games.join'(gameId, sessionId, playerName) {
        if (Games.findOne( { _id: gameId} ) === undefined) {
            throw new Meteor.Error('game-not-found', "Game with ID " + gameId + " not found");
        }

        const game = Games.findOne( { _id: gameId} );
        const newSessionIds = game.sessionIds;
        const newPlayerNames = game.playerNames;
        newSessionIds.push(sessionId);
        newPlayerNames.push(playerName);

        Games.update(gameId, { $set: { sessionIds: newSessionIds, playerNames: newPlayerNames } });
    },
    'games.remove'(gameId) {
        // TODO check if player part of game
        Games.remove(gameId);
    },
});
