class CreateRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.string :title
      t.string :meal
      t.string :prep_time
      t.string :cook_time
      t.string :image

      t.timestamps
    end
  end
end
