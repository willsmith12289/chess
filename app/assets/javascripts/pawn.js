//= require ./piece

var Pawn = Piece.extend({
	defaults: {
		type: 'pawn',
		space: {
			rank: [2,7],
			file: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
		},
		hasMoved: false
	},

	initialize: function () {
		this.possibleMoves = [];
	},

	attack: function (squares, square) {
		square.removePiece(square.get('piece'));
		this.attackMoves(square);
		this.move(squares, square);
	},

	attackMoves: function (desiredSquare) {
		if (desiredSquare.get('piece')) {
			this.possibleMoves.push({ rank: this.forward(1), file: this.right(1) });
			this.possibleMoves.push({ rank: this.forward(1), file: this.left(1) });
		}
	},

	move: function (squares, square) {
		if (!this.get('hasMoved')) { this.firstMove(); }
		else {
			this.legalMove(square);
		}
		if (_.find(this.possibleMoves, square.location())) {
			Piece.prototype.move.call(this, squares, square);
			this.set({ hasMoved: true });
			this.possibleMoves = [];
		}
	},

	firstMove: function () {
		this.possibleMoves.push({
			rank: this.forward(1),
			file: this.get('space').file
		});
		this.possibleMoves.push({
			rank: this.forward(2),
			file: this.get('space').file
		});
	},

	legalMove: function (desiredSquare) {
		if (!desiredSquare.get('piece')) {
			this.possibleMoves.push({ rank: this.forward(1), file: this.right(0) });
		}
	}
})