//= require ./piece

var Queen = Piece.extend({
	defaults: {
		type: 'queen',
		space: {
			rank: [1, 8],
			file: ['d']
		}
	}
})