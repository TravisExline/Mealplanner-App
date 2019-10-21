class PlannerRecipesController < ApplicationController 
    def index
        planner_recipes = PlannerRecipe.all 
        render json: planner_recipes, except: [:created_at, :updated_at]
    end

    def create
        planner_recipe = PlannerRecipe.create(planner_recipe_params)

        planner = Planner.find(planner_recipe_params[:planner_id])
        user = planner.user
        # byebug
        

        render json: user, :include => {
            planners: {
                except: [:created_at, :updated_at],
                include: {
                    planner_recipes: {
                        include: :recipe
                    }
                }
            }
        }, except: [:created_at, :updated_at]
    end


    def remove
        planner_recipe = PlannerRecipe.find_by(planner_recipe_params)
        user = planner_recipe.planner.user
        planner_recipe.destroy

        render json: user, :include => {
            planners: {
                except: [:created_at, :updated_at],
                include: {
                    planner_recipes: {
                        include: :recipe
                    }
                }
            }
        }, except: [:created_at, :updated_at]
    end

    private

    def planner_recipe_params
        params.require(:planner_recipe).permit(:planner_id, :recipe_id)
    end
end
