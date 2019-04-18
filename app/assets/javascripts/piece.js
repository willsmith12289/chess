var Piece = Backbone.Model.extend({
	defaults: {
		attacking: false,
		color: null,
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
		this.set({ attacking: true });
		return this.move(allSquares, attackedSquare);
	},

	imageClass: function () {
		return this.get('color') + '-' + this.get('type');
	},

	move: function (allSquares, endSquare) {
		this.set({ moves: [] });
		// this.isInCheck(allSquares);
		this.generatelegalMoves(this.moveArgs(allSquares, endSquare));

		if (this.isLegalMove(endSquare)) {
	    if (this.get('attacking')) {
	    	endSquare.removePiece(endSquare.get('piece'));
	    	this.set({ attacking: false });
	    }
	    this.set({ space: endSquare.location() });
	    endSquare.set({ piece: this });
	    this.isInCheck(allSquares);
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
		return _.find(this.get('moves'), final.location())
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

	isInCheck: function (squares) {
		var color = this.get('color');
		this.set({ moves: [] });
		this.get('type') === 'pawn' ?
			this.attackMoves() : this.generatelegalMoves(squares);
		var self = this;
		var checked =  this.get('moves').map(function (move) {
			return _.filter(squares.where(move), function (square) {
				var location = square.location();
				return _.isEqual(move,location) && square.get('piece') && square.get('piece').toJSON().type == 'king';
			})
		})
		checked = checked.filter(function(x){ return !_.isEmpty(x); })
		console.log(checked);
		if (!_.isEmpty(checked)) { return true; } else { return false; }
	},

	otherSidesKing: function (square, color) {
		console.log(_.result(square.toJSON(), 'piece.color', false));

		return _.isEqual(_.result(square.toJSON(), 'piece.type', false), 'king') && _.isEqual(_.result(square.toJSON(), 'piece.color', false), color);
	}
})