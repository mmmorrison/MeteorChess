Meteor.publish('users', function () {
  return Meteor.users.find({}, {users: 1, profile: 1})
});

Meteor.publish('games', function () {
  this.userId
  return Games.find({ $or: [{b:this.userId}, {w:this.userId}]})
});

Meteor.publish('game', function (gameId) {
  // Meteor won't allow you to return a single item in a publication.  You have return an object that could hold multiple items.
  return Games.find({ _id: gameId})
});

Meteor.publish('chat', function(gameId) {
  return Conversations.find({ game: gameId})
})
