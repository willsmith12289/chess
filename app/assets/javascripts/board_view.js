var BoardView = Backbone.View.extend({
	el: '#board',


	events: {
		'click .square': 'findClickedSquare'
	},

	initialize: function () {
    this.activePiece = null;
    game.setBoard(this.collection);
	},

  render: function () {
  	game.setBoard(this.collection);
  },

  findClickedSquare: function (e) {
  	var id = e.target.dataset.id;
		var square = this.collection.get(id);
    this.handleClick(square);
  },

  handleClick: function (square) {
    var clickedPiece = square.get('piece');
    if (clickedPiece) {
      if (this.activePiece && clickedPiece != this.activePiece) {
        console.log('attack');
        this.activePiece.attack(this.collection, square);
        this.activePiece = null;
      } else {
        this.activePiece = clickedPiece;
      }
    } else if (this.activePiece) {
      this.activePiece.move(this.collection, square);
      this.activePiece = null;
    }
  }
});