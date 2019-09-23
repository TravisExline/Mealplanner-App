class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :email
  has_many :planners
  has_many :planner_recipes, through: :planners
  has_many :recipes, through: :planner_recipes

  def initialize(user)
    @user = user
  end

  def to_serialized_json
    options = {
      include: {
        planners: {
          except: [:created_at, :updated_at],
          include: {
            planner_recipes: {
              include: :recipes
            }
          }
        }
      }
    }
    @user.to_json(options)
  end

end
