Template.users.onCreated(function() {
  this.subscribe('users');
});

Template.users.helpers({
  users: function () {
    return Meteor.users.find({ username: { $not: (Meteor.user() || {}).username}})
  }
})
