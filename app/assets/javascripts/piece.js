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
	},

	move: function (squares, square) {
    squares.clearPiece(this.get('space'));
    this.set({ space: square.location() });
    square.set({ piece: this });
	},

	forward: function (i) {
		var rank = this.get('space').rank;
		return this.get('color') === 'black' ?
			rank-i : rank+i;
	},

	back: function (i) {
		var rank = this.get('space').rank;
		return this.get('color') === 'black' ?
			rank+i : rank-i;
	},

	right: function (i) {
		var file = this.get('space').file.charCodeAt(0);
		var charCode = this.get('color') === 'black' ?
			file-i : file+i;
		return String.fromCharCode(charCode);
	},

	left: function (i) {
		var file = this.get('space').file.charCodeAt(0);
		var charCode = this.get('color') === 'black' ?
			file+i : file-i;
		return String.fromCharCode(charCode);
	},

})