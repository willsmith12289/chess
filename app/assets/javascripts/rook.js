//= require ./piece

var Rook = Piece.extend({
	defaults: {
		type: 'rook',
		space: {
			rank: [1, 8],
			file: ['a', 'h']
		}
	}
})