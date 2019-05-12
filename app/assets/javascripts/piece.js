//= require ./piece_master
var Piece = PieceMaster.extend({
	defaults: {
		attacking: false,
		color: null,
		in_check: false,
		moves: [],
		space: {
			rank: null,
			file: null,
		},
		type: null
	},

	initialize: function () {
		this.msg = '';
	},

	attack: function (allSquares, attackedSquare) {
		var deadPiece = attackedSquare.get('piece');
		if (this.get('in_check') && !this.legalCheckMove(deadPiece)) {
			this.msg = deadPiece.get('color') + ' is in check';
			return false;
		} else {
			this.msg = '';
			if (deadPiece.isKing()) { this.msg = this.get('color') + " wins."; }
			this.set({ attacking: true });
			return this.move(allSquares, attackedSquare);
		}
	},

	legalCheckMove: function (deadPiece) {
		if ((!this.isKing() && deadPiece.get('giving_check')) || this.isKing()) {
			return true;
		} else {
			this.msg = 'Illegal Move: Must move out of check.';
			return false;
		}
	},

	generatelegalCheckMoves: function (allSquares, endSquare) {
		var deadPiece = endSquare.get('piece');
		if (this.legalCheckMove(deadPiece)) {
			this.collection.toggleCheck(this.collection.player(this.get('color')));
			this.generatelegalMoves(this.moveArgs(allSquares, endSquare));
		}
	},

	generateMoves: function (allSquares, endSquare) {
		this.set({ moves: [] });
		if (this.get('in_check') && endSquare.get('piece')) {
			this.generatelegalCheckMoves(allSquares, endSquare)
		} else if (!this.get('in_check')) {
			this.generatelegalMoves(this.moveArgs(allSquares, endSquare));
		}
	},

	doMove: function (endSquare) {
		this.get('attacking') ?
    	endSquare.removePiece(endSquare.get('piece')) : this.msg = '';
    $('#rules').html(this.msg);
    this.set({
    	attacking: false,
    	has_moved: true,
    	space: endSquare.location()
    });
    endSquare.set({ piece: this });
    return true;
	},

	move: function (allSquares, endSquare) {
		this.generateMoves(allSquares, endSquare);
		return this.isLegalMove(endSquare) ? this.doMove(endSquare) : false;
	},

	moveArgs: function (squareCollection, endingPosition) {
		var type = this.get('type');
		// figure out why i needed this.isKing()
		if ((type === 'rook' || type === 'bishop' || type === 'queen')) {
			return (this.isCastling() || this.isKing()) ?
				endingPosition : squareCollection;
		} else { return endingPosition; }
	},

	generatePossibleAttacks: function (squares, square) {
		this.set({ moves: [] });
		if (!this.isCastling()) {
			(this.get('type') === 'pawn') ?
				this.attackMoves() :
				this.generatelegalMoves(this.moveArgs(squares, square));
		}
		this.setPossibleAttacks();
	},

	setPossibleAttacks: function () {
		var model = this;

    var possibleAttacks = _.flatten(model.get('moves').map(function (move) {
    	return model.collection.filter(function (p) {
    		var occupied = _.isEqual(p.get('space'), move);
    		return occupied && !model.isTurn(p.get('color'));
    	});
    }));
    model.set({ moves: possibleAttacks });
	}
})