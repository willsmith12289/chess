//= require ./piece

var Knight = Piece.extend({
	defaults: {
		type: 'knight',
		space: {
			rank: [1, 8],
			file: ['b', 'g']
		}
	}

})