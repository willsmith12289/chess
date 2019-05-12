var PieceMaster = Backbone.Model.extend({
	urlRoot: '/pieces',

	// parse: function (data) {
	// 	data.color = data.color ? 'black' : 'white';
	// 	data.type = this.find_type(data.type);
	// 	return data;
	// },

	// find_type: function (type) {
	// 	switch (type) {
	// 		case 0:
	// 			return 'bishop';
	// 			break;
	// 		case 1:
	// 			return 'king';
	// 			break;
	// 		case 2:
	// 			return 'knight';
	// 			break;
	// 		case 3:
	// 			return 'pawn';
	// 			break;
	// 		case 4:
	// 			return 'queen';
	// 			break;
	// 		case 5:
	// 			return 'rook';
	// 			break;
	// 		default: null
	// 	}
	// },

	isKing: function () {
		return this.get('type') === 'king';
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
		return this.isCastling() || _.isMatch(color,this.get('color'));
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
		return this.get('color') + '-' + this.get('type');
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