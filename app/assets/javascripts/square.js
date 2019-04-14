var Square = Backbone.Model.extend({
	initialize: function () {
		this.listenTo(this, 'change:piece', this.renderPiece);
	},

	renderPiece: function (e) {
		if (this.get('piece')) {
			this.domEl().addClass(this.get('piece').imageClass());
		} else {
			this.domEl().css('background-image', 'none');
		}
	},

	location: function () {
		return {rank: this.get('rank'), file: this.get('file') };
	},

	domEl: function () {
		var rank = this.get('rank'),
				file = this.get('file');
		return $('button.square[data-rank="'+ rank +'"][data-file="'+ file +'"]');
	}

})