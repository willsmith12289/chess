var PieceMaster = Backbone.Model.extend({
	urlRoot: '/pieces',

	parse: function (data) {
		data.color = data.color ? 'black' : 'white';
		return data;
	},

	type: function () {
		const typeEnum = {
			0: 'bishop',
	    1: 'king',
	    2: 'knight',
	    3: 'pawn',
	    4: 'queen',
	    5: 'rook'
		};
		return typeEnum[this.get('type')];
	},

	isKing: function () {
		return this.type() === 'king';
	},

	addMove: function(move) {
		this.attributes.moves.push(move);
	},

	forward: function (i) {
		return this.isBlack() ?
			this.get('space').rank-i : this.get('space').rank+i;
	},

	back: function (i) {
		return this.isBlack() ?
			this.get('space').rank+i : this.get('space').rank-i;
	},

	right: function (i) {
		return String.fromCharCode(this.filesCharCode()+i);
	},

	left: function (i) {
		return String.fromCharCode(this.filesCharCode()-i);
	},

	isBlack: function () {
		return this.get('color') === 'black';
	},

	isCastling: function () {
		var castling = this.get('castling');
		return castling === true && castling != undefined;
	},

	isTurn: function (color) {
		return this.isCastling() || _.isEqual(color,this.get('color'));
	},

  nextTurn: function () {
    return this.isBlack() ? 'white' : 'black';
  },

	isLegalMove: function (final) {
		return _.some(this.get('moves'), final.location());
	},

	filesCharCode: function () {
		return this.get('space').file.charCodeAt(0);
	},

	imageClass: function () {
		console.log(this.type());
		return this.get('color') + '-' + this.type();
	},

	moveGenerator: function (squares, direction, king) {
		king = king || false;
		var i = 1,
				countTo = king ? 3 : 9;
				square = new Square();

		while(i < countTo && square && !square.get('piece')) {
			var dir = direction.apply(this, [i]);
			this.addMove(dir);
			var square = squares.where(dir)[0];
			i++;
		}
	},
})