Meteor.methods({
  setFriend: function(userId) {
    var query = {};
    query[alreadyFriends(userId) ? '$pull' : '$push'] = {
      'profile.friends': userID
    };
    Meteor.users.update(this.userId, query)
  }
})
