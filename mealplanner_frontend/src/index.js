const baseURL = "http://localhost:3000"
const recipesURL = `${baseURL}/recipes`
const signInName = document.querySelector('#user-sign-in-name')
const signInEmail = document.querySelector('#user-sign-in-email')
const signInForm = document.querySelector('.sign-in-form')
const createRecipeForm = document.querySelector('.create-recipe-form')
const createPlannerForm = document.querySelector('.create-planner-form')
const userPlanner = document.querySelector('#user-planner')
const userGreeting = document.querySelector('#user-greeting') 
const usersURL = `${baseURL}/users`
const plannersURL = `${baseURL}/planners`
const plannerRecipesURL = `${baseURL}/planner_recipes`
const mainContainer = document.querySelector('main')

const searchOptions = document.querySelector('.search-options')


const recipesButton = document.querySelector('#recipes-bttn')
const usersButton = document.querySelector('#users-bttn')
const logoutButton = document.querySelector("#logout-button")

const addToPlanner = document.querySelector('#recipe-button')
const plannerRecipes = document.querySelector('.planner-recipe-card')

const newRecipeName = document.querySelector('#recipe-name')
const newRecipeMeal = document.querySelector('#recipe-meal')
const newRecipePrep = document.querySelector('#recipe-prep')
const newRecipeCook = document.querySelector('#recipe-cook')
const newRecipePage = document.querySelector('.new-recipe-page')




document.addEventListener('DOMContetnLoaded', initialLoad())

function initialLoad(e) {

    hideRecipeForm()
}

//callback
//using anonymous function
recipesButton.addEventListener('click', function() {
    showRecipes()
    hideUserPlanner()
    hideRecipeForm()
    hideNewRecipe()
    fetchRecipes()
})

//callback
//using anonymous function
usersButton.addEventListener('click', function() {
    let plannerRecipes = currentUser.planners[currentUser.planners.length - 1].planner_recipes
    let recipes = plannerRecipes.map(planner_recipe => planner_recipe.recipe)
    hideRecipes()
    showCurrentUser()
    renderUserPlanner(recipes)
    showUserPlanner()
    hideNewRecipe()
    showRecipeForm()
    isCurrentUser()
})

//callback
//using anonymous function
searchOptions.addEventListener('change', function(e){
    fetch(baseURL + `/${e.target.value}`)
    //callback x 2
    .then(res => res.json())
    .then(recipes => renderRecipes(recipes))
})

//callback
signInForm.addEventListener('submit', function(e) {
    e.preventDefault()
    fetch(usersURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: signInName.value,
            email: signInEmail.value
        })
    })
    .then(function(res){
        return res.json()
    })
    //callback
    .then(function(newUser) {
        currentUser = newUser
        localStorage.currentUser = newUser.id
        renderCurrentUser()
        hideSignInForm() 
    })
})

//callback
createRecipeForm.addEventListener('submit', function(e) {
    e.preventDefault()
    fetch(recipesURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            title: newRecipeName.value,
            meal: newRecipeMeal.value,
            prep_time: newRecipePrep.value,
            cook_time: newRecipeCook.value
        })
    })
    .then(res => res.json())
    .then(function(newRecipe) {
        //callback
        currentRecipe = newRecipe
        helpRecipeDisplay()
    }) 
})

createPlannerForm.addEventListener('submit', function(e) {
    e.preventDefault()
    // newPlannerId = currentUser.planners.length + 1
    // debugger
    fetch(plannersURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            user_id: currentUser.id
        })
    })
    .then(res => res.json())
    .then(function(res) {
        currentUser = res
        renderCurrentUser()
    })
})


function helpRecipeDisplay() {
    if(currentRecipe){
        let id = currentRecipe.id
        fetch(recipesURL + "/" + id)
        //callback
        .then(res => res.json())
        .then(function(res){
            currentRecipe = res 
            console.log(currentRecipe)
            renderNewRecipe()
        })
        hideUserPlanner()
        hideCurrentUser()
        hideRecipeForm();
    }
}

function hideSignInForm() {
    signInForm.style.display = 'none'
}

function hideRecipes() {
    mainContainer.style.display = 'none'
}

function hideUserPlanner() {
    userPlanner.style.display = 'none'
}

function hidePlannerRecipes() {
    plannerRecipes.style.display = 'none'
}


function hideCurrentUser() {
    userGreeting.style.display = 'none'
}

function hideRecipeForm() {
    createRecipeForm.style.display = 'none'
}

function showRecipeForm() {
    createRecipeForm.style.display = ""
}

function hideNewRecipe() {
    newRecipePage.style.display = 'none'
}

function showNewRecipe() {
    newRecipePage.style.display = ""
}

function showUserPlanner() {
    userPlanner.style.display = ""
}

function showRecipes() {
    mainContainer.style.display = ""
}

function showCurrentUser() {
    userGreeting.style.display = ""
}

function showSignInForm() {
    signInForm.style.display = ""
}

//callback
//using anonymous arrow function
logoutButton.addEventListener('click', () => {
    localStorage.clear(currentUser)
    window.location.reload()
})

function renderCurrentUser() {
    userGreeting.innerText = " "
    userGreeting.innerText = `${currentUser.name}'s Meal Plan`
    let plannerRecipes = currentUser.planners[currentUser.planners.length - 1].planner_recipes
    let recipes = plannerRecipes.map(planner_recipe => planner_recipe.recipe)
    showUserPlanner()
    renderUserPlanner(recipes)
    renderRecipeForm()
    hideRecipes()
}

function renderRecipeForm() {
    createRecipeForm.style.display = ""
}

function renderNewRecipe() {
   showNewRecipe()
   newRecipePage.innerHTML = " "
   newRecipePage.innerHTML = `<div class='new-recipe-view'>
   <h2>${currentRecipe.title}</h2>
   <p>${currentRecipe.meal}</p>
   <p>${currentRecipe.prep_time}</p>
   <p>${currentRecipe.cook_time}</p>
   </div>`
}

function renderUserPlanner(recipes) {
    userPlanner.innerHTML = " "
    //callback
        recipes.forEach((recipe) => {
            userPlanner.innerHTML += `<div class="planner-recipe-card">
            <h3>${recipe.title}</h3>
            <p><strong>${recipe.meal}</strong></p>
            <p>Prep: ${recipe.prep_time}</p>
            <p>Cook: ${recipe.cook_time}</p>
            <button onclick=removeFromPlanner(event) data-recipe-id="${recipe.id}">Remove Recipe From Planner</button>
            </br>
            </br>
            </div>`
        })
}



function fetchRecipes() {
    fetch(recipesURL)
    //callback
    .then(res => res.json())
    .then(recipes => renderRecipes(recipes))

    hideCurrentUser()
    hideRecipeForm()
}


function renderRecipes(recipes) {
    mainContainer.innerHTML = " "
    //callback
    recipes.forEach(recipe => {
        mainContainer.innerHTML += `<div class="recipe-card">
        <h3>${recipe.title}</h3>
        <p><strong>${recipe.meal}</strong></p>
        <p>Prep: ${recipe.prep_time}</p>
        <p>Cook: ${recipe.cook_time}</p>
        <button onclick=addRecipeToPlanner(event) data-recipe-id="${recipe.id}" >Add ${recipe.title} to Planner</button>
        </div>
        </br>
        </br>`
    })
}


function removeFromPlanner(event) {
    let plannerId = currentUser.planners[currentUser.planners.length - 1].id
    fetch(plannerRecipesURL + "/remove", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            planner_id: plannerId,
            recipe_id: event.target.dataset.recipeId
        })
    })
    .then(res => res.json())
    .then(res => {
        currentUser = res
        renderCurrentUser()
    })
}



function addRecipeToPlanner(event) {
    let plannerId = currentUser.planners[currentUser.planners.length - 1].id
    fetch(plannerRecipesURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            planner_id: plannerId,
            recipe_id: event.target.dataset.recipeId
        }),
    })
    .then(res => res.json())
    .then(res => {
        currentUser = res
        showCurrentUser()
        renderCurrentUser()
        let planner_recipes = currentUser.planners[currentUser.planners.length - 1].planner_recipes
        // debugger
        //callback
        let recipes = planner_recipes.map((planner_recipe) => {
            return planner_recipe.recipe
        })
        renderUserPlanner(recipes)
    })
}


function isCurrentUser() {
    if(localStorage.currentUser) {
        let id = localStorage.currentUser 
        fetch(usersURL + "/" + id)
        .then(res => res.json())
        .then(function(res) {
            currentUser = res 
            renderCurrentUser()
        })
        showUserPlanner();
        hideRecipes();
        hideSignInForm();
    } else {
        showSignInForm()
        hideCurrentUser()
        hideRecipeForm()
        hideRecipes()
    }
}

