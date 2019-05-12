# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20190511014947) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "pieces", force: :cascade do |t|
    t.boolean "color"
    t.string "moves", default: [], null: false, array: true
    t.jsonb "space", default: {"file"=>"z", "rank"=>0}, null: false
    t.integer "rank"
    t.string "file"
    t.integer "type"
    t.boolean "has_moved", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["file"], name: "index_pieces_on_file"
    t.index ["rank"], name: "index_pieces_on_rank"
  end

end
