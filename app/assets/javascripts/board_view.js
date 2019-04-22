//= require ./board_wizard

var BoardView = BoardWizard.extend({

  clickHandler: function (square) {
    var clickedPiece = square.get('piece');

    if (clickedPiece) { this.pieceClickedHandler(square); }
    else if (this.isMoving(clickedPiece)) { this.moveHandler(square); }
  },

  inCheckTasks: function () {
    $('#rules').html(this.nextTurn() + ' is in check');
    this.piece.set({ giving_check: true });
    this.pieces.toggleCheck(this.pieces.player(this.nextTurn()));
  },

  isInCheck: function (squares, square) {
    this.piece.generatePossibleAttacks(squares, square);
    return _.some(this.piece.get('moves'), function (move) {
      return move.isKing();
    });
  },

  moveHandler: function (square) {
    var view = this;
    if (view.piece.move(view.collection, square)) {
      if (view.isInCheck(view.collection, square)) { view.inCheckTasks(); }
      var castling = view.piece.isCastling() && view.piece.isKing();
      view.piece.set({ castling: false });
      view.changeTurn(castling);
    }
  },

  pieceClickedHandler: function (square) {
    var clickedPiece = square.get('piece');
    if (this.isAttacking(clickedPiece)) {
      if (this.piece.attack(this.collection, square)) { this.changeTurn(); }
    } else if (clickedPiece.isTurn(this.turn)) {
      this.startingSquare = square;
      this.piece = clickedPiece;
    }
  }
});