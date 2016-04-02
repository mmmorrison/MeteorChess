Template.games.onCreated(function() {
  this.subscribe('users');
  this.subscribe('games');
});

Template.games.helpers(function() {
  possibleOpponents: function() {
    var users = Meteor.user();
    var friends = user.profile.friends || [];

    Games.find({ result: null }).forEach(function (games) {
      var color = (games.w === user.id) : 'b' : 'w';

      games[color]
    })

  }
});
