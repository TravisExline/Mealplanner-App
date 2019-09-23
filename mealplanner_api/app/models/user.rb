class User < ApplicationRecord
    has_many :planners
    has_many :planner_recipes, through: :planners
    has_many :recipes, through: :planner_recipes
end
