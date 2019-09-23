const baseURL = "http://localhost:3000"
const recipesURL = `${baseURL}/recipes`
const signInName = document.querySelector('#user-sign-in-name')
const signInEmail = document.querySelector('#user-sign-in-email')
const signInForm = document.querySelector('.sign-in-form')
const createRecipeForm = document.querySelector('.create-recipe-form')
const userPlanner = document.querySelector('#user-planner')
const userGreeting = document.querySelector('#user-greeting') 
const usersURL = `${baseURL}/users`
const plannersURL = `${baseURL}/planners`
const plannerRecipesURL = `${baseURL}/planner_recipes`
const mainContainer = document.querySelector('main')

const searchOptions = document.querySelector('.search-options')


const recipesButton = document.querySelector('#recipes-bttn')
const usersButton = document.querySelector('#users-bttn')

const addToPlanner = document.querySelector('#recipe-button')

const newRecipeName = document.querySelector('#recipe-name')
const newRecipeMeal = document.querySelector('#recipe-meal')
const newRecipePrep = document.querySelector('#recipe-prep')
const newRecipeCook = document.querySelector('#recipe-cook')
const newRecipePage = document.querySelector('.new-recipe-page')


document.addEventListener('DOMContetnLoaded', function() {
    fetchRecipes()
    isCurrentUser()
})

recipesButton.addEventListener('click', function() {
    showRecipes()
    fetchRecipes()
    renderRecipes()
    showRecipes()
    hideSignInForm()
    hideRecipeForm()
    hideNewRecipe()
    // debugger
})

usersButton.addEventListener('click', function() {
    hideRecipes()
    showCurrentUser()
    isCurrentUser()
    showUserPlanner()
    hideNewRecipe()
    showRecipeForm()
    // debugger
})

searchOptions.addEventListener('change', function(e){
    fetch(baseURL + `/${e.target.value}`)
    .then(res => res.json())
    .then(recipes => renderRecipes(recipes))
    // debugger
})

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
    .then(res => res.json())
    .then(function(newUser) {
        currentUser = newUser
        localStorage.currentUser = newUser.id
        renderCurrentUser()
        hideSignInForm() 
    })
})


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
        currentRecipe = newRecipe
        // debugger
        helpRecipeDisplay()
    }) 
})


// addToPlanner.addEventListener('click', function(e) {
//     e.preventDefault()
//     // debugger
//     fetch(plannerRecipesURL, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json"
//         },
//         body: JSON.stringify({
//             planner_id: planner.id.value,
//             recipe_id: recipe.id.value
//         })
//     })
//     .then(res => res.json())
//     .then(res => {
//         currentUser = res 
//         // debugger
//         renderCurrentUser()
//         renderUserPlanner()
//     })
// })

function helpRecipeDisplay() {
    if(currentRecipe){
        let id = currentRecipe.id
        // debugger
        fetch(recipesURL + "/" + id)
        .then(res => res.json())
        .then(function(res){
            currentRecipe = res 
            console.log(currentRecipe)
            renderNewRecipe()
            // debugger
        })
        hideUserPlanner()
        hideCurrentUser()
        hideRecipeForm();
    } else {
        console.log("oops")
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

function renderCurrentUser() {
    // showCurrentUser()
    // let userPlanner = currentUser.planners[currentUser.planners.length - 1]
    userGreeting.innerText = " "
    userGreeting.innerText = `${currentUser.name}'s Meal Plan`
    // debugger
    renderUserPlanner()
    showUserPlanner()
    renderRecipeForm()
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

function renderUserPlanner() {

}

// function loadEventListener() {
//     mainContainer.addEventListener('click', getRecipe)
// }

// function getRecipe(e) {
//     if(e.target.mainContainer.contains('recipe-button')) {
//         const addedRecipe = e.target.ParentElement.ParentElement;
//         getRecipeInfo(addedRecipe)
//     }
// }

// function getRecipeInfo(recipe) {
//     const recipeInfo = {
//         title: recipe.querySelector('h3').textContent
//     }
//     addRecipeToPlanner(recipeInfo)
// }

// function addRecipeToPlanner(recipe) {
//     const row = document.createElement('h3');
//     row.innerHTML = `
//     <h3>
//         ${recipe.title}
//     </h3>
//     </br>
//     </br>`

//     userPlanner.appendChild(row)
// }

function fetchRecipes() {
    fetch(recipesURL)
    .then(res => res.json())
    .then(recipes => renderRecipes(recipes))

    hideCurrentUser()
    hideRecipeForm()
}


function renderRecipes(recipes) {
    mainContainer.innerHTML = " "
    // debugger
    recipes.forEach(recipe => {
        // debugger
        mainContainer.innerHTML += `<div class="recipe-card">
        
        <h3>${recipe.title}</h3>
        <p><strong>${recipe.meal}</strong></p>
        <p>Prep: ${recipe.prep_time}</p>
        <p>Cook: ${recipe.cook_time}</p>
        <button onclick=addRecipeToPlanner(event) data-recipe-id="${recipe.id}" >Add ${recipe.title} to Planner</button>
        </br>
        </br>
        </div>`
    })
}


function addRecipeToPlanner(event) {
    // debugger
    let plannerId = currentUser.planners[currentUser.planners.length]
    // debugger
    fetch(plannerRecipesURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            planner_id: `${plannerId}`,
            recipe_id: `${event.target.dataset.recipeId}`
        }),
    })
    .then(res => res.json())
    .then(res => {
        debugger
        currentUser = res 
        renderCurrentUser()
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
            // debugger
        })
        hideRecipes()
        // debugger
        hideSignInForm();
    } else {
        showSignInForm()
        hideCurrentUser()
        hideRecipeForm()
        hideRecipes()
    }
}

