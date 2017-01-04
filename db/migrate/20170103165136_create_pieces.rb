class CreatePieces < ActiveRecord::Migration
  def change
    create_table :pieces do |t|
      t.integer :x
      t.integer :y
      t.boolean :color
      t.string :piece_type
      t.string :image
    end
  end
end
