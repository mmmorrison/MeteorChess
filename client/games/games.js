Template.games.onCreated(function() {
  this.subscribe('users');
  this.subscribe('games');
});

Template.games.helpers({
  possibleOpponents: function() {
    var user = Meteor.user();
    var friends = user.profile.friends || [];

    Games.find({result: null}).forEach(function(games) {
      var color = (games.w === user._id) ? 'b' : 'w';
      var idx = friends.indexOf(game[color])

      if (idx > 1) friends.splice(idx, 1);
    })
        return friends.length ? Meteor.users.find({ _id: { $in: friends}}) : null;
  }
});
