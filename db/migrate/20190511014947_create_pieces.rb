class CreatePieces < ActiveRecord::Migration[5.1]
  def change
    create_table :pieces do |t|
      t.boolean :color
      t.string :moves, array: true, null: false, default: []
      t.jsonb :space, null: false, default: {"rank": 0, "file": "z"}
      t.integer :rank, index: true
      t.string :file, index: true
      t.integer :type
      t.boolean :has_moved, null: false, default: false

      t.timestamps
    end
  end
end
