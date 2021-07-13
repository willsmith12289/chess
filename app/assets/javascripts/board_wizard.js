var BoardWizard = Backbone.View.extend({
	el: '#board',

	events: {
		'click .square': 'findClickedSquare'
	},

	initialize: function (opts) {
    this.pieces = new PieceCollection();
    this.changeTurn();
    _.bindAll(this, 'clickHandler');
    game.setBoard(this.collection, this.pieces);
	},

  render: function () {
  	game.setBoard(this.collection);
  },

  clickHandler: function () {},

  changeTurn: function (castling) {
    castling = castling || false;
    if (this.startingSquare) { this.startingSquare.unset('piece'); }
    this.piece = null;
    this.startingSquare = null;
    this.turn = castling ? this.turn : this.nextTurn();
    $('#player').html(this.turn + "'s turn");
  },

  findClickedSquare: function (e) {
    var id = e.target.dataset.id;
    var square = this.collection.get(id);
    if (square) { this.clickHandler(square); }
  },

  isAttacking: function (clickedPiece) {
    return this.piece && !clickedPiece.isTurn(this.turn);
  },

  isMoving: function (containsPiece) {
    return this.piece && !containsPiece;
  },

  nextTurn: function () {
    return this.turn === 'black' ? 'white' : 'black';
  },
});