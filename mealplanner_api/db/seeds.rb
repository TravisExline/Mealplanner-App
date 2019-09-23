# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

pb_j = Recipe.create(title: "PB and J", meal: "Lunch", prep_time: "2 Minutes", cook_time: "2 Minutes", image: "https://cdn.pastemagazine.com/www/articles/THIS%20IS%20THE%20MAIN%20PB.png")

ham_and_cheese = Recipe.create(title: "Ham and Cheese", meal: "Lunch", prep_time: "2 Minutes", cook_time: "10 Minutes", image: "https://honestcooking.com/wp-content/uploads/2014/12/Image-1.jpg")

steak_eggs = Recipe.create(title: "Steak and Eggs", meal: "Breakfast", prep_time: "5 Minutes", cook_time: "20 Minutes", image: "https://assets.bonappetit.com/photos/5caf9c5d43874c87052978f1/16:9/w_1200,c_limit/Basically-Steak-Eggs-Platter.jpg")

mush_risotto = Recipe.create(title: "Mushroom Risotto", meal: "Dinner", prep_time: "10 Minutes", cook_time: "20 Minutes", image: "https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/53/2018/06/Easy-mushroom-risotto.jpg")

beef_welli = Recipe.create(title: "Beef Wellington", meal: "Dinner", prep_time: "10 Minutes", cook_time: "2 Hours", image: "https://www.simplyrecipes.com/wp-content/uploads/2009/06/beef-wellington-horiz-a2-1800-600x411.jpg")
