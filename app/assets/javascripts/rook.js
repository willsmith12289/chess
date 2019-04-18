//= require ./piece

var Rook = Piece.extend({
	defaults: {
		type: 'rook',
		space: {
			rank: [1, 8],
			file: ['a', 'h']
		}
	},

	generatelegalMoves: function (squares) {
		this.moveGenerator(squares, move.forward);
		this.moveGenerator(squares, move.back);
		this.moveGenerator(squares, move.right);
		this.moveGenerator(squares, move.left);
	}
})