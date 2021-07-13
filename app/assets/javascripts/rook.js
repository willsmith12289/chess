//= require ./piece

var Rook = Piece.extend({
	defaults: {
		castling: false,
		has_moved: false,
		type: 5,
		space: {
			rank: [1, 8],
			file: ['a', 'h']
		}
	},

	generatelegalMoves: function (squares) {
		if (this.isCastling()) {
			this.jumpKingForCastle();
		} else {
			this.moveGenerator(squares, move.forward);
			this.moveGenerator(squares, move.back);
			this.moveGenerator(squares, move.right);
			this.moveGenerator(squares, move.left);
		}
	},

	rightKing: function () {
		var leftSpace = { rank: this.forward(0), file: this.left(1) };
		return this.collection.filter(function (p) {
			return _.isEqual(p.get('space'), leftSpace) && p.isKing();
		});
	},

	leftKing: function () {
		var rightSpace = { rank: this.forward(0), file: this.right(2) };
		return this.collection.filter(function (p) {
			return _.isEqual(p.get('space'), rightSpace) && p.isKing();
		});
	},

	jumpKingForCastle: function () {
		if (this.rightKing()[0]) {
			this.addMove({ rank: this.forward(0), file: this.left(2) });
		}
		if (this.leftKing()[0]) {
			this.addMove({ rank: this.forward(0), file: this.right(3) });
		}
	}
})