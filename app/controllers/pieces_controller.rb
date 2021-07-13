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
      params[:color] = params[:color] == 'black' ? true : false
      params.require(:piece).permit(:color, :moves, :has_moved, :type, space: [:rank, :file])
    end
end