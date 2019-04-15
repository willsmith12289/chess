//= require ./piece

var Queen = Piece.extend({
	defaults: {
		type: 'queen',
		space: {
			rank: [1, 8],
			file: ['d']
		}
	},

	initialize: function () {
		this.possibleMoves = [];
	},

	move: function (squares, square) {
		this.legalMoves(square);
		if (_.find(this.possibleMoves, square.location())) {
			Piece.prototype.move.call(this, squares, square);
			this.possibleMoves = [];
		}
	},

	legalMoves: function () {
	}
})