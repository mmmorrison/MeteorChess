Meteor.methods({
  setFriend: function(userId) {
    var query = {};
    query[alreadyFriends(userId) ? '$pull' : '$push'] = {
      'profile.friends': userId
    };
    Meteor.users.update(this.userId, query)
  },

  createGame: function (color, opponentId) {
    var otherColor = (color === 'w') ? 'b' :'w';

    var game = {
      moves: " ",
      board: (new Chess).fen()
    };

    game[color] = this.userId;
    game[otherColor] = opponentId;
    game.needsConfirmation = opponentId;

    Games.insert(game, function (err, id) {
      if (err) throw err;

      Conversations.insert({
        game: id,
        users: [this.userId, opponentId],
        messages: [{
          name: 'system',
          text: 'Game started ' + (new Date).toString()
        }]
      })
    }.bind(this))
    // the bind() method creates a new function that when called has its "this" keyword to set to the provided value
  },

  acceptGame: function(gameId) {
    Games.update(gameId, {$unset: { needsConfirmation: null}})
  },

  declineGame: function(gameId) {
    Games.remove(gameId)
  }
})
