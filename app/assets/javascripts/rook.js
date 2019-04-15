//= require ./piece

var Rook = Piece.extend({
	defaults: {
		type: 'rook',
		space: {
			rank: [1, 8],
			file: ['a', 'h']
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
		this.moveForward(squares);
		this.moveBack(squares);
		this.moveRight(squares);
		this.moveLeft(squares);
	},

	moveForward: function (squares) {
		var i = 1,
				square = new Square();

		while(i < 9 && square && !square.get('piece')) {
			var forward = { rank: this.forward(i), file: this.right(0) };
			this.possibleMoves.push(forward);
			square = squares.where(forward)[0];
			i++;
		}
	},

	moveBack: function (squares) {
		var i = 1,
				square = new Square();

		while(i < 9 && square && !square.get('piece')) {
			var back = { rank: this.back(i), file: this.right(0) };
			this.possibleMoves.push(back);
			square = squares.where(back)[0];
			i++;
		}
	},

	moveLeft: function (squares) {
		var i = 1,
				square = new Square();

		while(i < 9 && square && !square.get('piece')) {
			var left = { rank: this.back(0), file: this.left(i) };
			this.possibleMoves.push(left);
			square = squares.where(left)[0];
			i++;
		}
	},

	moveRight: function (squares) {
		var i = 1,
				square = new Square();

		while(i < 9 && square && !square.get('piece')) {
			var right = { rank: this.back(0), file: this.right(i) };
			this.possibleMoves.push(right);
			square = squares.where(right)[0];
			i++;
		}
	},

	// moveRank: function () {
	// },

	// moveFile: function () {
	// 	var i = 1,
	// 			square = new Square();

	// 	while(i < 9 && square && !square.get('piece')) {
	// 		this.possibleMoves.push({ rank: this.forward(i), file: this.right(0) });
	// 		this.possibleMoves.push({ rank: this.back(i), file: this.right(0) });
	// 		square = squares.where(fr)[0];
	// 		i++;
	// 	}
	// 	for (var i = 1; i < 9; i++) {
	// 		this.possibleMoves.push({ rank: this.back(0), file: this.right(i) });
	// 		this.possibleMoves.push({ rank: this.back(0), file: this.left(i) });
	// 	}
	// }
})