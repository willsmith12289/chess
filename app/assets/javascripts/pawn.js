//= require ./piece

var Pawn = Piece.extend({
	defaults: {
		type: 3,
		space: {
			rank: [2,7],
			file: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
		},
		has_moved: false,
	},

	attackMoves: function () {
		this.addMove(move.forwardLeft.apply(this, [1]));
		this.addMove(move.forwardRight.apply(this, [1]));
	},

	move: function (squares, end, start) {
		this.set({ has_moved: this._super('move',squares, end, start) });
		return this.get('has_moved');
	},

	firstMove: function () {
		this.addMove(move.forward.apply(this, [1]));
		this.addMove(move.forward.apply(this, [2]));
	},

	generatelegalMoves: function (desiredSquare) {
		if (this.get('attacking')) { this.attackMoves(); }
		else if (!this.get('has_moved')) { this.firstMove(); }
		else if (this.isNormalMove(desiredSquare)) {
			this.addMove(move.forward.apply(this, [1]));
		}
	},

	isNormalMove: function (desiredSquare) {
		return !desiredSquare.get('piece') && !this.get('attacking')
	}
})