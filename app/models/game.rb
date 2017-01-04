class Game < ActiveRecord::Base
  has_many :pieces
  has_many :pawns
  has_many :rooks
  has_many :knights
  has_many :bishops
  has_many :kings
  has_many :queens

  after_create :initialize_board

  def initialize_board
  #for white pieces
    (1..8).each do |i|
      Pawn.create(
        x: i,
        y: 1,
        color: "false",
        type: "pawn",
        image: "whitepawn.png"
      )
    end
    (1..8).each do |i|
      Pawn.create(
        x: i,
        y: 8,
        color: "true",
        type: "pawn",
        image: "blackpawn.png"
      )
    end
  end

end