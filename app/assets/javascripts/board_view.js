var BoardView = Backbone.View.extend({
	el: '#board',


	events: {
		'click .square': 'findClickedSquare'
	},

	initialize: function () {
		// this.listenTo(this.collection, 'update', this.setActivePiece);
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
    // console.log(square);
    var clickedPiece = square.get('piece');
    if (clickedPiece) {
      if (this.activePiece && clickedPiece != this.activePiece) {
        console.log('attack');
      } else {
        this.activePiece = clickedPiece;
      }
    } else if (this.activePiece) {
      this.collection.clearPiece(this.activePiece.get('space'));
      this.activePiece.set({ space: square.location(), active: false });
      square.set({ piece: this.activePiece });
      this.activePiece = null;
    }
  }
});