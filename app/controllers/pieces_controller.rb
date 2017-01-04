class PiecesController < ApplicationController
  before_action :set_piece, only: [:show, :edit, :move, :update, :destroy]

  # GET /pieces
  # GET /pieces.json
  def index
    @pieces = Piece.all
    @x = params[:x]
    @y = params[:y]
    # move_piece(@x, @y)
  end

  # GET /pieces/1
  # GET /pieces/1.json
  def show
  end

  # GET /pieces/new
  def new
    @piece = Piece.new
    @x = params[:x]
    @y = params[:y]
  end

  # GET /pieces/1/edit
  def edit
  end

  # POST /pieces
  # POST /pieces.json
  def create
    @piece = Piece.new(piece_params)

    respond_to do |format|
      if @piece.save
        format.html { redirect_to @pieces, notice: 'Piece was successfully created.' }
        format.json { render :show, status: :created, location: @piece }
      else
        format.html { render :new }
        format.json { render json: @piece.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /pieces/1
  # PATCH/PUT /pieces/1.json
  def update
    @x = params[:x]
    @y = params[:y]
    respond_to do |format|
      if @piece.update(piece_params)
        format.html { redirect_to @piece, notice: 'Piece was successfully updated.' }
        format.json { render :index, status: :ok, location: @pieces }
      else
        format.html { render :edit }
        format.json { render json: @piece.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pieces/1
  # DELETE /pieces/1.json
  def destroy
    @piece.destroy
    respond_to do |format|
      format.html { redirect_to pieces_url, notice: 'Piece was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_piece
      @piece = Piece.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def piece_params
      params.require(:piece).permit(:x, :y, :color, :type, :image)
    end
end
