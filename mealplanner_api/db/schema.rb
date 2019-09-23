# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_09_12_160049) do

  create_table "planner_recipes", force: :cascade do |t|
    t.integer "planner_id"
    t.integer "recipe_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["planner_id"], name: "index_planner_recipes_on_planner_id"
    t.index ["recipe_id"], name: "index_planner_recipes_on_recipe_id"
  end

  create_table "planners", force: :cascade do |t|
    t.integer "user_id"
  end

  create_table "recipes", force: :cascade do |t|
    t.string "title"
    t.string "meal"
    t.string "prep_time"
    t.string "cook_time"
    t.string "image"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "planner_recipes", "planners"
  add_foreign_key "planner_recipes", "recipes"
end
