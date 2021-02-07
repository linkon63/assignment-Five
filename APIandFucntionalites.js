document.getElementById('searchBtn').addEventListener('click', function () {
    const foodNameInput = document.getElementById('foodName').value;
    //Input validation empty-string or somethings else
    if (foodNameInput == 0 || foodNameInput == undefined || foodNameInput == null) {
        console.log('empty')
        document.getElementById('errorMsg').style.display = 'block';
    }
    //loading API ........
    loadApiData(foodNameInput).then(data => {
        const meals = data.meals;
        //fetching API Data and get the info of data
        meals.forEach(element => {
            const strMealName = element.strMeal;
            const imageLink = element.strMealThumb;
            //Displaying Name and Images of searched food
            const containerFood = document.getElementById('showingFoodArea');
            const addedFoodDiv = document.createElement('div');
            addedFoodDiv.className = 'foods';
            const displayFood = `
            <div onclick="clickedDetails('${strMealName}');">
            <img class="food-image" src=${imageLink}>
            <h3 class="food">${strMealName}</h>
            </div>
                `;
            addedFoodDiv.innerHTML = displayFood;
            containerFood.appendChild(addedFoodDiv);
        });
    })
})

//Btn Click API Call and Get the whole Data 
function clickedDetails(strMealName) {
    loadApiData(strMealName).then(data => {
        const meals = data.meals[0];
        showDetails(meals); // Function Calling for send API specific Data
    })
}
// This Function will show the data when clicked the div section
const showDetails = meals => {
    //Ingredient Section get Data from API call
    const strMealName = meals.strMeal
    const strMealThumb = meals.strMealThumb;
    const strInstructions = meals.strInstructions;
    const strMeasure1 = meals.strMeasure1;
    const strMeasure4 = meals.strMeasure4;
    const strMeasure2 = meals.strMeasure2;
    const strMeasure3 = meals.strMeasure3;
    const strMeal = meals.strMeal;
    //Displaying Thumnails and foodName and ingredient 
    const ingredientSection = document.getElementById('IngredientSection');
    const ingredientDisplay = `
        <img src=${strMealThumb}>
        <h1>${strMealName}  </h1>
        <h3>Ingredient   </h3>
        <li>${strMeal}      </li>
        <li>${strMeasure1}  </li>
        <li>${strMeasure4}  </li>
        <li>${strMeasure3}  </li>
        <li>${strMeasure2}  </li>
        <h5>${strInstructions}</h5>
        `
    ingredientSection.innerHTML = ingredientDisplay;
}

//Loading API Data From Here
async function loadApiData(searchByFoodName) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchByFoodName}`);
    const data = await response.json();
    return data;
}