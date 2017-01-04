$(document).ready(function () {
	$("td").click(function() {
		$this = $(this);

		var isSelected = $('td').hasClass('selected');

		if (isSelected) {
			var $piece = $('td.selected');
      console.log("var$piece");
      if ($this.hasClass('selected')) {
        deselectPiece($this);
        console.log("deselectPiece");

      } else {
        var end = $this.attr('id');
        movePiece($piece, end);
      }
    } else {
      selectPiece($this);
      console.log("select");
    };
		
	})

  function movePiece ($piece, $end) {
    var piece = {
      x: parseInt($end.slice(0, 1)),
      y: parseInt($end.slice(2))
    }
    console.log(piece),
    submitAjaxUpdate(piece);
  };

  function submitAjaxUpdate(piece) {
    $.ajax({
      type: 'GET',
      url: '/pieces',
      data: { 
        piece: piece
      },
      success: function(data) {
        $(location).attr('href', data.update_url);
         console.log("success");
         
      }
    });
  };

  function selectPiece($piece) {
    // if (isTurn) {
      $piece.addClass('selected');
    //}
  }

  function deselectPiece($piece) {
    $piece.removeClass('selected')
  }

})