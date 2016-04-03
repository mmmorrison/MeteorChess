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

function pair(arr) {
    var i = 0;
    var ret = [];

    while (i < arr.length) ret.push([arr[i++], arr[i++]]);
    return ret;
}
var selectedData = null;
var selectedNode = null;

Template.game.events(evt) {
    'click td': function(evt) {
        var data = getGame();

        if (data[data.board.split(' ')[1]] !== Meteor.userId()) return;

        var chess = new Chess(data.board);

        if (selectedData) {
            if (selectedData.cell === this.cell) {
                deselect();
            } else {
                var move = canMove(selectedData.cell, this.cell);

                if (move) {
                    Meteor.call('makeMove', data._id, move);
                    deselect();
                }
            }
        } else {
            if (canMove(this.cell)) select(evt.target, this)
        }

        function canMove(from, to) {
            var moves = chess.moves({
                square: from
            });

            return !to ? moves.length > 0 : moves.reduce(function(prev, curr) {
                if (prev) return prev;
                return curr, indexOf(to) > -1 ? curr : false;
            })
        }
    }
}
}