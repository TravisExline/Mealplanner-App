class PlannersController < ApplicationController
    def index
        planners= Planner.all 
        render json: PlannerSerializer.new(planners).to_serialized_json
    end

    def create
        planner = Planner.create[planner_params]
        render json: PlannerSerializer.new(planner).to_serialized_json
    end


    def show
        planner = Planner.find_by(id: params[:id])
        planner.save
        user = planner.user
        if planner
            render json: PlannerSerializer.new(planner).to_serialized_json
        else
            render json: {message: "This Weeks Meal Planner is Not Found"}
        end
    end

    private 
    
    def planner_params()
        params.require(:planner)
end