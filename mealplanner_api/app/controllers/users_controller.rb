class UsersController < ApplicationController
    def index
        users = User.all 
        render json: users, except: [:created_at, :updated_at],
        :include => {
            planners: {
                except: [:created_at, :updated_at],
                include: {
                    recipe: {
                        except: [:created_at, :updated_at],
                    }
                }
            }
        }
    end

    def show 
        user = User.find_by(id: params[:id])
        if user
            render json: user, except: [:created_at, :updated_at],
            :include => {
                planners: {
                    except: [:created_at, :updated_at],
                    include: {
                        recipes: {
                            except: [:created_at, :updated_at],
                        }
                    }
                }
            }
        else
            render json: {message: 'User Not Found'}
        end
    end

    def create
        user = User.find_or_create_by(user_params)
        if user.planners.length == 0
            planner = Planner.create
            user.planners << planner
        end
        render json: user, except: [:created_at, :updated_at],
        :include => {
            planners: {
                except: [:created_at, :updated_at],
                include: {
                    recipes: {
                        except: [:created_at, :updated_at],
                    }
                }
            }
        }
    end

    private

    def user_params
        params.require(:user).permit(:name, :email)
    end
end
