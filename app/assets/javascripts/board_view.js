var BoardView = Backbone.View.extend({
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

  clickHandler: function (square) {
    var clickedPiece = square.get('piece'),
        view = this;

    if (clickedPiece) { view.pieceWasClicked(square); }
    else if (view.isMoving(clickedPiece)) {
      if (view.piece.move(view.collection, square)) {
        if (view.isInCheck(view.collection, square)) {
          view.piece.set({ giving_check: true });
          view.pieces.toggleCheck(view.pieces.otherSide(view.nextTurn()));
        }
        var castling = view.piece.isCastling() && view.piece.isKing();
        view.piece.set({ castling: false });
        view.changeTurn(castling);
      }
    }
  },

  isInCheck: function (squares, square) {
    this.piece.generatePossibleAttacks(squares, square);
    var inCheck = _.some(this.piece.get('moves'), function (deadPiece) {
      if (deadPiece) { return deadPiece.isKing(); } });
    if (inCheck) { $('#rules').html(this.nextTurn() + ' is in check'); }
    return inCheck;
  },

  pieceWasClicked: function (square) {
    var clickedPiece = square.get('piece');
    if (this.isAttacking(clickedPiece)) {
      if (this.piece.attack(this.collection, square)) { this.changeTurn(); }
    } else if (clickedPiece.isTurn(this.turn)) {
      this.startingSquare = square;
      this.piece = clickedPiece;
    }
  },

  /**************************************************
  * Working general methods.
  * Shouldn't need to tinker.
  **************************************************/

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