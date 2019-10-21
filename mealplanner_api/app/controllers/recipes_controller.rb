class RecipesController < ApplicationController
    def index
        recipes = Recipe.all 
        render json: recipes, except: [:created_at, :updated_at]
    end

    def create
        recipe = Recipe.create(recipes_params)
        render json: recipe,  except: [:created_at, :updated_at]
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
            render json: recipe,  except: [:created_at, :updated_at]
            
        else
            render json: {message: 'Recipe Not Found'}
        end
    end

    def destroy
        recipe = Recipe.find(params[:id])
        recip.destroy

        render json: recipe, except: [:created_at, :updated_at]
    end

    private

    def recipes_params
        params.require(:recipe).permit(:title, :meal, :prep_time, :cook_time)
    end
end
