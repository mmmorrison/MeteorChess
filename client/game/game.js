Template.game.OnCreated(function() {
  this.autorun(() => {
    this.subscribe('users');
    this.subscribe('game', FlowRouter.getParam('id'))
  })
})

Template.game.helpers({
  currentTurn: function() {

  }
})
