//= require ./piece

var King = Piece.extend({
	defaults: {
		type: 'king',
		space: {
			rank: [1, 8],
			file: ['e']
		}
	}
})