var BoardView = Backbone.View.extend({
	el: '#board',


	events: {
		'click .square': 'findClickedSquare'
	},

	initialize: function () {
    this.changeTurn();
    _.bindAll(this, 'clickHandler');
    game.setBoard(this.collection);
	},

  render: function () {
  	game.setBoard(this.collection);
  },

  isAttacking: function (clickedPiece) {
    return this.piece && !clickedPiece.isTurn(this.turn)
  },

  isMoving: function (containsPiece) {
    return this.piece && !containsPiece
  },

  changeTurn: function () {
    if (this.startingSquare) { this.startingSquare.unset('piece'); }
    this.piece = null;
    this.startingSquare = null;
    this.turn = this.turn === 'black' ? 'white' : 'black';
  },

  findClickedSquare: function (e) {
  	var id = e.target.dataset.id;
		var square = this.collection.get(id);
    if (square) { this.clickHandler(square); }
  },

  clickHandler: function (square) {
    var clickedPiece = square.get('piece');

    if (clickedPiece) { this.pieceWasClicked(square); }
    else if (this.isMoving(clickedPiece)) {
      if (this.piece.move(this.collection, square)) { this.changeTurn(); }
    }
  },

  pieceWasClicked: function (square) {
    var clickedPiece = square.get('piece');

    if (this.isAttacking(clickedPiece)) {
      if (this.piece.attack(this.collection, square)) { this.changeTurn(); }
    } else if (clickedPiece.isTurn(this.turn)) {
      console.log('turn');
      // if (clickedPiece.isInCheck(this.collection)) {
      //   console.log('check');
      //   if (clickedPiece.get('type') === 'king') {
      //     this.startingSquare = square;
      //     this.piece = clickedPiece;
      //   }
      // } else {
        this.startingSquare = square;
        this.piece = clickedPiece;
      // }
    }
  }
});