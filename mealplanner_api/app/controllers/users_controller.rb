class UsersController < ApplicationController
    def index
        users = User.all 
        render json: UserSerializer.new(users).to_serialized_json
    end

    def show 
        user = User.find_by(id: params[:id])
        if user
            render json: UserSerializer.new(user).to_serialized_json
        else
            render json: {message: 'User Not Found'}
        end
    end

    def create
        user = User.find_or_create_by(user_params)
        render json: UserSerializer.new(user).to_serialized_json
    end

    private

    def user_params
        params.require(:user).permit(:name, :email)
    end
end
