class RecipeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :meal, :prep_time, :cook_time
  has_many :planner_recipes
  has_many :planners, through: :planner_recipes

end
