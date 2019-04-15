//= require ./piece

var Bishop = Piece.extend({
	defaults: {
		type: 'bishop',
		space: {
			rank: [1, 8],
			file: ['c', 'f']
		}
	},

	initialize: function () {
		this.possibleMoves = [];
	},

	attack: function (squares, square) {
		square.removePiece(square.get('piece'));
		this.move(squares, square);
	},

	move: function (squares, square) {
		this.legalMoves(squares);
		if (_.find(this.possibleMoves, square.location())) {
			Piece.prototype.move.call(this, squares, square);
			this.possibleMoves = [];
		}
	},

	legalMoves: function (squares) {
		this.forwardRight(squares);
		this.forwardLeft(squares);
		this.backRight(squares);
		this.backLeft(squares);
	},


	forwardRight: function (squares) {
		var i = 1,
				square = new Square();

		while(i < 9 && square && !square.get('piece')) {
			var fr = { rank: this.forward(i), file: this.right(i) }
			this.possibleMoves.push(fr);
			square = squares.where(fr)[0];
			i++;
		}
	},

	forwardLeft: function (squares) {
		var i = 1,
				square = new Square();
		while(i < 9 && square && !square.get('piece')) {
			var fl = { rank: this.forward(i), file: this.left(i) };
			this.possibleMoves.push(fl);
			square = squares.where(fl)[0];
			i++;
		}
	},

	backRight: function (squares) {
		var i = 1,
				square = new Square();

		while(i < 9 && square && !square.get('piece')) {
			var br = { rank: this.back(i), file: this.right(i) };
			this.possibleMoves.push(br);
			square = squares.where(br)[0];
			i++;
		}
	},

	backLeft: function (squares) {
		var i = 1,
				square = new Square();

		while(i < 9 && square && !square.get('piece')) {
			var bl = { rank: this.back(i), file: this.left(i) };
			this.possibleMoves.push(bl);
			square = squares.where(bl)[0];
			i++;
		}
	},
})