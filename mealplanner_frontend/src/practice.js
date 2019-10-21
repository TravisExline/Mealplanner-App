// //write an aonymous regular function 

function() {
    console.log("hi")
}

// //write an anonymous arrow function

() => {
    console.log("hi")
}


// //but functions need to be tied to a name UNLESS they are used as callbacks...see our iterators below

// //the difference is there is no keyword 'function' and there's an arrow bnetween the parenths and opening curly

let funcName = function () {
    console.log("hi")
}

let funcName = () => {
    console.log("hi")
}

// //function above is NOT hoisted 
// //function below IS hoisted
// //READ ABOUT THIS

function oneFuncName () {
    console.log("hi")
}

// //take the function about and change it as an arrow function

let twoFuncName = () => {
    console.log("hi")
}

// //all arrow functions are essentially anonymous and need to be tied to a variable to be used later 


// // ITERATION PRACTICE -- WHICH ONE TO USE?

let array = ["Soup", "Salad", "Salmon", "Cheese", "Broccoli"]

// //1. Return an array with only values that start with 'S'
// //SELECT - 

let startsWithS = array.select((food) => {
    return food[0] === "S"
})

let startsWithS = array.select(function(food) {
    return food[0] === "S"
})


//notice that the callback function is ANONYMOUS meaning we can write it either way
//ANYTHING THAT ACCEPTS A CALLBACK means that it ACCEPTS AN ANONYMOUS FUNCTION DEFINITION OR A REFERENCE TO AN ALREADY EXISTING FUNCTION 

function selectS(food) {
    return food[0] === "S"
}

let startsWithS = array.select(selectS)

//2. Return an array with the first value that starts with "S"

let firstS = function() {
    return startsWithS.first
}

//3. Return an array with all values now lowercase

let lowerCase = array.map((food) => {
    return food.toLowerCase
})

//4. Console.log each value and also add it to the practice div on the dom 

const practiceDiv = document.querySelector("#practice")
practiceDiv.innerHTML = ""

function displayInDiv(foods) {
    foods.forEach((food) => {
        console.log(food)
        practiceDiv.innerHTML += `<h2>${food}</h2>`
    })
}

//After you're done with, I want you to go through your whole project so far, and notice when you're passing in a function as a callback argument
//By marking it either with a comment or a star or something

