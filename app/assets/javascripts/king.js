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

	initialize: function () {
		this.rook = null;
	},

	canCastle: function (desiredSquare) {
		this.moveGenerator(desiredSquare.collection, move.right, true);
		this.moveGenerator(desiredSquare.collection, move.left, true);
		var canMove = _.some(this.get('moves'), function (move) {
			return _.isEqual(move, desiredSquare.location());
		});
		return !this.get('has_moved') && canMove;
	},

	generatelegalMoves: function (desiredSquare) {
		if (desiredSquare && this.canCastle(desiredSquare)) {
			this.moveDirection(desiredSquare);
		} else {
			this.addMove(move.forward.apply(this, [1]));
			this.addMove(move.forwardLeft.apply(this, [1]));
			this.addMove(move.forwardRight.apply(this, [1]));
			this.addMove(move.back.apply(this, [1]));
			this.addMove(move.backRight.apply(this, [1]));
			this.addMove(move.backLeft.apply(this, [1]));
			this.addMove(move.right.apply(this, [1]));
			this.addMove(move.left.apply(this, [1]));
		}
	},

	kingSide: function (desiredSquare) {
		var rightMove = { rank: this.forward(0), file: this.right(2) },
				self = this;
		if (_.isEqual(rightMove, desiredSquare.location())) {
			self.addMove(rightMove);
			var rightRookSpace = { rank: self.forward(0), file: self.right(3) };
			this.rook = this.findRooks().filter(function (r) {
				return _.isEqual(r.get('space'), rightRookSpace);
			})[0];
		}
	},

	queenSide: function (desiredSquare) {
		var leftMove = { rank: this.forward(0), file: this.left(2) },
				self = this;
		if (_.isEqual(leftMove, desiredSquare.location())) {
			self.addMove(leftMove);
			var leftRookSpace = { rank: self.forward(0), file: self.left(4) };
			this.rook = this.findRooks().filter(function (r) {
				return _.isEqual(r.get('space'), leftRookSpace);
			})[0];
		}
	},

	moveDirection: function (desiredSquare) {
		this.kingSide(desiredSquare);
		this.queenSide(desiredSquare);
		if (this.rook) {
			this.set({ castling: true });
			this.rook.set({ castling: true });
		}
	},

	findRooks: function () {
		return this.collection.where({ type: 'rook', color: this.get('color') });
	}
})