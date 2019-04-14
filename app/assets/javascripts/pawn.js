//= require ./piece

var Pawn = Piece.extend({
	defaults: {
		type: 'pawn',
		space: {
			rank: [2,7],
			file: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
		}
	}

})