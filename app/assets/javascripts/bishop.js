//= require ./piece

var Bishop = Piece.extend({
	defaults: {
		type: 0,
		space: {
			rank: [1, 8],
			file: ['c', 'f']
		}
	},

	generatelegalMoves: function (squares) {
		this.moveGenerator(squares, move.forwardRight);
		this.moveGenerator(squares, move.forwardLeft);
		this.moveGenerator(squares, move.backRight);
		this.moveGenerator(squares, move.backLeft);
	}
})