class CreatePlannerRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :planner_recipes do |t|
      t.references :planner, foreign_key: true
      t.references :recipe, foreign_key: true

      t.timestamps
    end
  end
end
