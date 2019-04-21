var Piece = Backbone.Model.extend({
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
		if (this.get('in_check') && this.illegalCheckMove(deadPiece)) {
			this.msg = deadPiece.get('color') + ' is in check';
			return false;
		} else {
			this.msg = '';
			if (deadPiece.isKing()) { this.msg = this.get('color') + " wins."; }
			this.set({ attacking: true });
			return this.move(allSquares, attackedSquare);
		}
	},

	attackHandler: function (endSquare) {
		if (this.get('attacking')) {
    	endSquare.removePiece(endSquare.get('piece'));
    	this.set({ attacking: false });
	  } else {
	  	this.msg = '';
	  }
	},

	illegalCheckMove: function (deadPiece) {
		if ((!this.isKing() && deadPiece.get('giving_check')) || this.isKing()) {
			return false;
		} else {
			this.msg = 'Illegal Move: Must move out of check.';
			return true;
		}
	},

	generatelegalCheckMoves: function (allSquares, endSquare) {
		var deadPiece = endSquare.get('piece');
		if (!this.illegalCheckMove(deadPiece)) {
			var otherColor = this.isBlack() ? 'black' : 'white';
			this.collection.toggleCheck(this.collection.otherSide(otherColor));
			this.generatelegalMoves(this.moveArgs(allSquares, endSquare));
		}
	},

	generateMoves: function (allSquares, endSquare) {
		this.set({ moves: [] });
		if (this.get('in_check') && endSquare.get('piece')) {
			this.generatelegalCheckMoves(allSquares, endSquare)
		} else {
			this.generatelegalMoves(this.moveArgs(allSquares, endSquare));
		}
	},

	doMove: function (endSquare) {
	  this.set({ space: endSquare.location() });
  	endSquare.set({ piece: this });
    $('#rules').html(this.msg);
	},

	move: function (allSquares, endSquare) {
		this.generateMoves(allSquares, endSquare);
		if (this.isLegalMove(endSquare)) {
			this.attackHandler(endSquare);
			this.doMove(endSquare);
	    return true;
	  } else {
	  	this.set({ attacking: false });
	  	return false;
	  }
	},

	moveArgs: function (squareCollection, endingPosition) {
		var type = this.get('type');
		return (type === 'rook' || type === 'bishop' || type === 'queen') ?
			squareCollection : endingPosition;
	},

	generatePossibleAttacks: function (squares) {
		var model = this;
		model.set({ moves: [] });
		model.get('type') === 'pawn' ?
      model.attackMoves() : model.generatelegalMoves(squares);
    var possibleAttacks = _.flatten(model.get('moves').map(function (move) {
    	return model.collection.filter(function (p) {
    		var occupied = _.isEqual(p.get('space'), move);
    		return occupied && !model.isTurn(p.get('color'));
    	});
    }));
    model.set({ moves: possibleAttacks });
	},

	/**************************************************
	* Working general methods.
	* Shouldn't need to tinker.
	**************************************************/

	isKing: function () {
		return this.get('type') === 'king';
	},

	addMove: function(move) {
		this.attributes.moves.push(move);
	},

	forward: function (i) {
		return this.isBlack() ?
			this.get('space').rank-i : this.get('space').rank+i;
	},

	back: function (i) {
		return this.isBlack() ?
			this.get('space').rank+i : this.get('space').rank-i;
	},

	right: function (i) {
		var newFilesCharCode = this.isBlack() ?
			this.filesCharCode()-i : this.filesCharCode()+i;
		return String.fromCharCode(newFilesCharCode);
	},

	left: function (i) {
		var newFilesCharCode = this.isBlack() ?
			this.filesCharCode()+i : this.filesCharCode()-i;
		return String.fromCharCode(newFilesCharCode);
	},

	isBlack: function () {
		return this.get('color') === 'black';
	},

	isTurn: function (color) {
		return color === this.get('color');
	},

	isLegalMove: function (final) {
		return _.find(this.get('moves'), final.location());
	},

	filesCharCode: function () {
		return this.get('space').file.charCodeAt(0);
	},

	imageClass: function () {
		return this.get('color') + '-' + this.get('type');
	},

	moveGenerator: function (squares, direction) {
		var i = 1,
				square = new Square();

		while(i < 9 && square && !square.get('piece')) {
			var dir = direction.apply(this, [i]);
			this.addMove(dir);
			var square = squares.where(dir)[0];
			i++;
		}
	},
})