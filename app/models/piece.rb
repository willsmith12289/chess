class Piece < ActiveRecord::Base
  #for white pieces
    (1..8).each do |i|
      Pawn.create(
        x: i,
        y: 2,
        color: "false",
        piece_type: "pawn",
        image: "whitepawn.png"
      )
    end
    Rook.create(x: 1, y: 1, color: "false", piece_type: "rook", image: "whiterook.png")
    Rook.create(x: 8, y: 1, color: "false", piece_type: "rook", image: "whiterook.png")
    
    Knight.create(x: 2, y: 1, color: "false", piece_type: "knight", image: "whiteknight.png")
    Knight.create(x: 7, y: 1, color: "false", piece_type: "knight", image: "whiteknight.png")

    Bishop.create(x: 3, y: 1, color: "false", piece_type: "bishop", image: "whitebishop.png")
    Bishop.create(x: 6, y: 1, color: "false", piece_type: "bishop", image: "whitebishop.png")

    Queen.create(x: 4, y: 1, color: "false", piece_type: "queen", image: "whitequeen.png")

    King.create(x: 5, y: 1, color: "false", piece_type: "king", image: "whiteking.png")

    (1..8).each do |i|
      Pawn.create(
        x: i,
        y: 7,
        color: "true",
        piece_type: "pawn",
        image: "blackpawn.png"
      )
    end
    Rook.create(x: 1, y: 8, color: "true", piece_type: "rook", image: "blackrook.png")
    Rook.create(x: 8, y: 8, color: "true", piece_type: "rook", image: "blackrook.png")
    
    Knight.create(x: 2, y: 8, color: "true", piece_type: "knight", image: "blackknight.png")
    Knight.create(x: 7, y: 8, color: "true", piece_type: "knight", image: "blackknight.png")

    Bishop.create(x: 3, y: 8, color: "true", piece_type: "bishop", image: "blackbishop.png")
    Bishop.create(x: 6, y: 8, color: "true", piece_type: "bishop", image: "blackbishop.png")

    Queen.create(x: 4, y: 8, color: "true", piece_type: "queen", image: "blackqueen.png")

    King.create(x: 5, y: 8, color: "true", piece_type: "king", image: "blackking.png")

    def move_piece(x, y)
      self.update_attributes(:x => x, :y => y)
    end

    def legal_moves(color)
      
    end


end
