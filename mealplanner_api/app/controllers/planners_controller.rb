class PlannersController < ApplicationController
    def index
        planners= Planner.all 
        render json: planners, except: [:created_at, :updated_at], :include => {
            recipes: {
                except: [:created_at, :updated_at]
            }
        } 
    end

    def create
        planner = Planner.create[planner_params]
        render json: planner, except: [:created_at, :updated_at], :include => {
            recipes: {
                except: [:created_at, :updated_at]
            }
        }
    end


    def show
        planner = Planner.find_by(id: params[:id])
        if planner
            render json: planner, include: [:recipe]
            # PlannerSerializer.new(planner).to_serialized_json
        else
            render json: {message: "This Weeks Meal Planner is Not Found"}
        end
    end

    private 
    
    def planner_params()
        params.require(:planner)
    end
    
end