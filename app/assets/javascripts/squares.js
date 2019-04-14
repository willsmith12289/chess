var SquareCollection = Backbone.Collection.extend({
	model: Square,

	initialPawn: function () {
		return {
			black: this.where({rank: 7}),
			white: this.where({rank: 2})
		}
	},

	findInitPosition: function (files) {
		var self = this;
		return {
			black:  files.map(function (file) {
				return _.filter(self.where({rank: 8}), function (sq) {
					return sq.get('file') === file;
				});
			}),
			white: files.map(function (file) {
				return _.filter(self.where({rank: 1}), function (sq) {
					return sq.get('file') === file;
				});
			})
		}
	},

	clearPiece: function (oldPlace) {
		var square = this.where(oldPlace)[0];
		square.unset('piece');
	}
})