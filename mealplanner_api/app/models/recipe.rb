class Recipe < ApplicationRecord
    has_many :planner_recipes
    has_many :planners, through: :planner_recipes
end
