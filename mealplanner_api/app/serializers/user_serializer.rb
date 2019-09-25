class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :email
  has_many :planners
  has_many :planner_recipes, through: :planners


end
