class PlannerSerializer
  include FastJsonapi::ObjectSerializer
  attributes 
  belongs_to :user
  has_many :planner_recipes
  has_many :recipes, through: :planner_recipes
end
