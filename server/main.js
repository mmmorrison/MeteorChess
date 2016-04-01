Meteor.publish('users', function () {
  return Meteor.users.find({}, {users: 1, profile: 1})
});

Meteor.publish('games', function () {
  this.userId
  return Games.find({ $or: [{b:this.userId}, {w:this.userId}]})
});
