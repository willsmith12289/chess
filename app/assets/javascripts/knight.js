//= require ./piece

var Knight = Piece.extend({
	defaults: {
		type: 2,
		space: {
			rank: [1, 8],
			file: ['b', 'g']
		}
	},

	generatelegalMoves: function () {
		this.addMove({ rank: this.forward(1), file: this.right(2) });
		this.addMove({ rank: this.back(1), file: this.right(2) });
		this.addMove({ rank: this.forward(1), file: this.left(2) });
		this.addMove({ rank: this.back(1), file: this.left(2) });
		this.addMove({ rank: this.back(2), file: this.left(1) });
		this.addMove({ rank: this.forward(2), file: this.left(1) });
		this.addMove({ rank: this.back(2), file: this.right(1) });
		this.addMove({ rank: this.forward(2), file: this.right(1) });
	}
})