class PlannersController < ApplicationController
    def index
        planners= Planner.all 
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

    def create
        planner = Planner.create(planner_params)
        # byebug
        user = planner.user
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


    def show
        planner = Planner.find_by(id: params[:id])
        if planner
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
            # PlannerSerializer.new(planner).to_serialized_json
        else
            render json: {message: "This Weeks Meal Planner is Not Found"}
        end
    end

    def destroy
        planner = Planner.find(params[:id])
        user = planner.user
        # planner.destroy

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
    
    def planner_params()
        params.require(:planner).permit(:user_id)
    end
    
end