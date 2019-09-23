class RecipesController < ApplicationController
    def index
        recipes = Recipe.all 
        render json: RecipeSerializer.new(recipes).to_serialized_json  
    end

    def create
        recipe = Recipe.create(recipes_params)
        render json: RecipeSerializer.new(recipe).to_serialized_json
    end

    def find_breakfast
        breakfast = Recipe.all.select{|recipe| recipe.meal == "Breakfast"}
        render json: breakfast
    end

    def find_lunch
        lunch = Recipe.all.select{|recipe| recipe.meal == "Lunch"}
        render json: lunch
    end

    def find_dinner
        dinner = Recipe.all.select{|recipe| recipe.meal == "Dinner"}
        render json: dinner
    end

    def show
        recipe = Recipe.find_by(id: params[:id])
        if recipe
            render json: RecipeSerializer.new(recipe).to_serialized_json
            
        else
            render json: {message: 'Recipe Not Found'}
        end
    end

    private

    def recipes_params
        params.require(:recipe).permit(:title, :meal, :prep_time, :cook_time)
    end
end
