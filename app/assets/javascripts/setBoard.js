game = {
	setBoard: function (squares, pieces) {
		var types = [Pawn, Bishop, Rook, Knight, King, Queen];
		_.each(types, function (type) {
			pieces.add(game.findThenCreate(type, squares));
		});
	},

	createPiece: function (initialSquares, type) {
		var pieceType = [];
		for (color in initialSquares) {
			_.each(initialSquares[color], function (sq) {
				var square = type === Pawn ? sq : sq[0];
	  		var piece = new type({ space: square.location(), color: color });
	  		square.set({piece: piece});
	  		pieceType.push(piece);
	  	});
		}
		return pieceType;
	},

	findThenCreate: function (type, squares) {
		var model = new type();
		var initialSquares = type == Pawn ?
			squares.initialPawn() :
			squares.findInitPosition(model.get('space').file);
		return game.createPiece(initialSquares, type);
	},
}