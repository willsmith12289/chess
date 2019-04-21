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

	addMove: function(move) {
		this.attributes.moves.push(move);
	},

	attack: function (allSquares, attackedSquare) {
		var deadPiece = attackedSquare.get('piece');
		if (this.get('in_check') && this.illegalCheckMove(deadPiece)) {
		} else {
			this.set({ attacking: true });
			return this.move(allSquares, attackedSquare);
		}
	},

	illegalCheckMove: function (deadPiece) {
		if (this.get('type') != 'king' && deadPiece.get('giving_check')) {
			return false;
		} else if (this.get('type') === 'king') { return false; }
		else { return true; }
	},

	imageClass: function () {
		return this.get('color') + '-' + this.get('type');
	},

	move: function (allSquares, endSquare) {
		this.set({ moves: [] });
		if (this.get('in_check')) {
			var deadPiece = endSquare.get('piece');
			if (deadPiece && !this.illegalCheckMove(deadPiece)) {
				var color = this.isBlack() ? 'black' : 'white';
				this.collection.toggleCheck(this.collection.otherSide(color));
				this.generatelegalMoves(this.moveArgs(allSquares, endSquare));
			} else { return false; }
		} else {
			this.generatelegalMoves(this.moveArgs(allSquares, endSquare));
		}

		if (this.isLegalMove(endSquare)) {
	    if (this.get('attacking')) {
	    	endSquare.removePiece(endSquare.get('piece'));
	    	this.set({ attacking: false });
	    }
	    this.set({ space: endSquare.location() });
	    endSquare.set({ piece: this });
	    return true;
	  } else {
	  	this.set({ attacking: false });
	  	return false;
	  }
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

	filesCharCode: function () {
		return this.get('space').file.charCodeAt(0);
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

	moveArgs: function (squareCollection, endingPosition) {
		var type = this.get('type');
		return (type === 'rook' || type === 'bishop' || type === 'queen') ?
			squareCollection : endingPosition;
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

	generatePossibleAttacks: function (squares) {
		var model = this;
		model.set({ moves: [] });
		model.get('type') === 'pawn' ?
      model.attackMoves() : model.generatelegalMoves(squares);
    var possibleAttacks = _.flatten(model.get('moves').map(function (move) {
    	return model.collection.filter(function (p) {
    		return _.isEqual(p.get('space'),move) && !model.isTurn(p.get('color')); });
    }));
    model.set({ moves: possibleAttacks });
	}
})