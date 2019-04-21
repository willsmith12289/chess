//= require ./piece

var King = Piece.extend({
	defaults: {
		has_moved: false,
		type: 'king',
		space: {
			rank: [1, 8],
			file: ['e']
		}
	},

	generatelegalMoves: function () {
		this.addMove(move.forward.apply(this, [1]));
		this.addMove(move.forwardLeft.apply(this, [1]));
		this.addMove(move.forwardRight.apply(this, [1]));
		this.addMove(move.back.apply(this, [1]));
		this.addMove(move.backRight.apply(this, [1]));
		this.addMove(move.backLeft.apply(this, [1]));
		this.addMove(move.right.apply(this, [1]));
		this.addMove(move.left.apply(this, [1]));
	}
})