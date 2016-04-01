Meteor.publish('users', function () {
  return Meteor.users.find({}, {users: 1, profile: 1})
});
