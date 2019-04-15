//= require ./piece

var Knight = Piece.extend({
	defaults: {
		type: 'knight',
		space: {
			rank: [1, 8],
			file: ['b', 'g']
		}
	},

	initialize: function () {
		this.possibleMoves = [];
	},

	attack: function (squares, square) {
		square.removePiece(square.get('piece'));
		this.move(squares, square);
	},

	move: function (squares, square) {
		this.legalMoves(square);
		if (_.find(this.possibleMoves, square.location())) {
			Piece.prototype.move.call(this, squares, square);
			this.possibleMoves = [];
		}
	},

	legalMoves: function () {
		this.possibleMoves.push({ rank: this.forward(1), file: this.right(2) });
		this.possibleMoves.push({ rank: this.back(1), file: this.right(2) });
		this.possibleMoves.push({ rank: this.forward(1), file: this.left(2) });
		this.possibleMoves.push({ rank: this.back(1), file: this.left(2) });
		this.possibleMoves.push({ rank: this.back(2), file: this.left(1) });
		this.possibleMoves.push({ rank: this.forward(2), file: this.left(1) });
		this.possibleMoves.push({ rank: this.back(2), file: this.right(1) });
		this.possibleMoves.push({ rank: this.forward(2), file: this.right(1) });
	}
})