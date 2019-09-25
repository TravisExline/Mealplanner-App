Rails.application.routes.draw do
  resources :users, only: [:index, :create, :show]
  resources :recipes, only: [:index, :create, :destroy, :show]
  resources :planners, only: [:index, :show, :destroy]
  resources :planner_recipes, only: [:index, :create, :destroy, :show]

  get '/find_breakfast' => 'recipes#find_breakfast'
  get '/find_lunch' => 'recipes#find_lunch'
  get '/find_dinner' => 'recipes#find_dinner'

end
