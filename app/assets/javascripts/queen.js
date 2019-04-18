//= require ./piece

var Queen = Piece.extend({
	defaults: {
		type: 'queen',
		space: {
			rank: [1, 8],
			file: ['d']
		}
	},

	generatelegalMoves: function (squares) {
		this.moveGenerator(squares, move.forward);
		this.moveGenerator(squares, move.back);
		this.moveGenerator(squares, move.right);
		this.moveGenerator(squares, move.left);
		this.moveGenerator(squares, move.forwardRight);
		this.moveGenerator(squares, move.forwardLeft);
		this.moveGenerator(squares, move.backRight);
		this.moveGenerator(squares, move.backLeft);
	}
})