// API LINKS:
// Cocktail Database:
// https://rapidapi.com/thecocktaildb/api/the-cocktail-db/
// Wiki API:
// https://www.mediawiki.org/wiki/API:Main_page

//results.js
// API LINKS:
// Cocktail Database:
// https://rapidapi.com/thecocktaildb/api/the-cocktail-db/
// Wiki API:
// https://www.mediawiki.org/wiki/API:Main_page


function displaySavedData() {
    // Get the recipe data from local storage
    let recipeData = JSON.parse(localStorage.getItem("recipe"));
    console.log(recipeData);

    // Displaying the recipe name and image
    const resultEl = document.querySelector("#results");
    console.log(resultEl, "Result Element")

    // If there is a result element, create the recipe name and image
    if (resultEl) {
        let backButton = document.createElement("button");
        backButton.setAttribute("class", "back-button");
        backButton.setAttribute("type", "button");
        backButton.textContent = "Back";
        resultEl.appendChild(backButton);

        // Redirect to results page
        backButton.addEventListener("click", () => {
            window.location.href = `index.html`;
        });
        
        // Create an h2 element for the recipe name
        let recipeName = document.createElement("h2");

        // Give it a class of recipe-name
        recipeName.setAttribute("class", "recipe-name");

        // Set the text content to the name of the recipe from the recipeData object
        recipeName.textContent = recipeData.strDrink;

        // Append the recipe name to the results element
        resultEl.appendChild(recipeName);

        // Create an img element for the recipe image
        let recipeImg = document.createElement("img");

        // Give it a class of recipe-img
        recipeImg.setAttribute("class", "recipe-img");

        // Set the src to the image from the recipeData object
        recipeImg.setAttribute("src", recipeData.strDrinkThumb);

        // Append the recipe image to the results element
        resultEl.appendChild(recipeImg);

        // Displaying ingredients and measurements
        // Creates a p element for the ingredients and measurements to be displayed in
        let recipeIngredients = document.createElement("p");

        // Give them all a class of recipe-ingredients
        recipeIngredients.setAttribute("class", "recipe-ingredients");

        // Create an empty array to store the ingredients and measurements
        let ingredients = [];

        // Loop through the recipeData object and push the ingredients and measurements into the array
        for (let i = 1; i < 16; i++) {
            // If there is an ingredient and measurement, push them into the array
            if (recipeData[`strIngredient${i}`] && recipeData[`strMeasure${i}`]) {
                ingredients.push(recipeData[`strIngredient${i}`], recipeData[`strMeasure${i}`]);
            }
        }

        // Join the ingredients and measurements array with a space
        recipeIngredients.textContent = ingredients.join(" ");

        // Append the ingredients and measurements to the results element
        resultEl.appendChild(recipeIngredients);

        // Displaying instructions
        // Create a p element for the instructions
        let recipeInstructions = document.createElement("p");

        // Give it a class of recipe-instructions
        recipeInstructions.setAttribute("class", "recipe-instructions");

        // Set the text content to the instructions from the recipeData object
        recipeInstructions.textContent =`${recipeData.strInstructions}`;

        // Append the instructions to the results element
        resultEl.appendChild(recipeInstructions);
    } else {
        console.error("No results element found");
    }

}
displaySavedData();