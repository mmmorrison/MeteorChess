Template.game.OnCreated(function() {
    this.autorun(() => {
        //autorun() will rerun the function whenever the value of the reactive function is changed.
        this.subscribe('users');
        this.subscribe('game', FlowRouter.getParam('id'))
            //FlowRouter.getParam() is the reactive function that will autorun is the value changes
    })
})

Template.game.helpers({
    currentTurn: function() {
        var game = getGame();
        return getUsername(game[game.board.split(' ')[1]])
    },

    result: function() {
        var result = getGame().result;

        if (!result) return null;
        if (result === 'draw') return 'Draw!';

        return getUsername(result) + ' won!'
    },

    moves: function() {
        return pair(getMoves()).map(function(arr) {
            return arr[0] + ' ' + (arr[1] || '');
        });
    },

    row: function() {
        var chess = new Chess();
        getMoves().forEach(chess.move.bind(chess));
        return makeRows(chess.fen(), getGame().b)
            //fen = Forsyth-Edwards Notation for chess moves
    }
});