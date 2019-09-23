class RecipeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :meal, :prep_time, :cook_time
  has_many :planner_recipes
  has_many :planners, through: :planner_recipes

  def initialize(recipe)
    @recipe = recipe
  end

  def to_serialized_json
    options = {
      except: [:created_at, :updated_at]
    }
    @recipe.to_json(options)
  end
end
