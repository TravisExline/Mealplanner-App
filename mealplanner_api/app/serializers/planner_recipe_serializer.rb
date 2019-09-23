class PlannerRecipeSerializer
  include FastJsonapi::ObjectSerializer
  attributes 
  belongs_to :planner
  belongs_to :recipe
end
