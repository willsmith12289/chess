//= require ./piece

var Bishop = Piece.extend({
	defaults: {
		type: 'bishop',
		space: {
			rank: [1, 8],
			file: ['c', 'f']
		}
	}
})