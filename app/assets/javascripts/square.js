var Square = Backbone.Model.extend({
	initialize: function () {
		this.listenTo(this, 'change:piece', this.renderPiece);
	},

	renderPiece: function (e) {
		if (this.get('piece')) {
			this.domEl().addClass(this.get('piece').imageClass());
		} else {
			var className = this.domEl().attr("class").split(' ').pop();
			this.domEl().removeClass(className);
		}
	},

	location: function () {
		return {rank: this.get('rank'), file: this.get('file') };
	},

	domEl: function () {
		var rank = this.get('rank'),
				file = this.get('file');
		return $('button.square[data-rank="'+ rank +'"][data-file="'+ file +'"]');
	},

	killPiece: function (piece) {
		this.domEl().removeClass(piece.imageClass());
		piece.destroy();
	}
})