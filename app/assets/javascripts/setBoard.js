game = {
	setBoard: function (squares) {
		var types = [Pawn, Bishop, Rook, Knight, King, Queen];
		_.each(types, function (type) {
			game.setType(type, squares)
		});
	},

	setType: function (type, squares) {
		var model = new type();
		var initialSquares = type == Pawn ?
			squares.initialPawn() :
			squares.findInitPosition(model.get('space').file);
		game.createPiece(initialSquares, type);
	},

	createPiece: function (initialSquares, type) {
		for (color in initialSquares) {
			_.each(initialSquares[color], function (sq) {
				var square = type === Pawn ? sq : sq[0];
	  		var piece = new type({ space: square.location(), color: color });
	  		square.set({piece: piece});
	  	})
		}
	}
}