class PlannerSerializer
  include FastJsonapi::ObjectSerializer
  attributes 
  belongs_to :user
  has_many :planner_recipes
  has_many :recipes, through: :planner_recipes

  def initialize(planner)
    @planner = planner
  end

  def to_serialized_json
    options = {
      include: {
        user: {
          only: [:name]
        }
      }
    }
    @planner.to_json(options)
  end
end
