class PiecesController < ApplicationController
  def create
    piece = Piece.new(piece_params)
    if piece.save
      render json: piece.to_json
    end
  end

  def update
    @piece = Piece.find(params[:id])
    if @piece.update(piece_params)
      render json: @piece.to_json
    end
  end

  private
    def piece_params
      params[:type] = get_type if params[:type].present?
      params[:color] = params[:color] == 'black' ? 1 : 0
      # params[:has_moved] = params[:hasMoved]
      params.require(:piece).permit(:color, :moves, :has_moved, :type, space: [:rank, :file])
    end

    def get_type
      case params[:type]
      when 'bishop'
        0
      when 'king'
        1
      when 'knight'
        2
      when 'pawn'
        3
      when 'queen'
        4
      when 'rook'
        5
      else
        nil
      end
    end
end