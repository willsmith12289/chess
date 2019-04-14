var Piece = Backbone.Model.extend({
	defaults: {
		space: {
			rank: null,
			file: null,
		},
		type: null,
		color: null,
		selected: false
	},

	imageClass: function () {
		return this.get('color') + '-' + this.get('type');
	}

})