var PieceCollection = Backbone.Collection.extend({
	model: Piece,

	player: function (turn) {
		return new this.constructor(this.where({ color : turn }));
	},

	toggleCheck (side) {
		side.each(function (piece) {
			piece.get('in_check') ?
				piece.set({ in_check: false }) : piece.set({ in_check: true });
		})
	}
})