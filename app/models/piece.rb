class Piece < ApplicationRecord
  self.inheritance_column = :_type_disabled
  enum type: {
    bishop: 0,
    king: 1,
    knight: 2,
    pawn: 3,
    queen: 4,
    rook: 5
  }
end
