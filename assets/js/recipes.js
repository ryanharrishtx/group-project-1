// recipes.js

document.addEventListener("DOMContentLoaded", () => {
    // Get the results container from DOM
    const resultsContainer = document.getElementById("results-container");

    // on click, get the drink ID from the clicked button
    resultsContainer.addEventListener("click", async (event) => {
        event.preventDefault(); 
        if (event.target.classList.contains("recipe-button")) {

            // Get the drink ID from the clicked button
            const clickedDrinkId = event.target.getAttribute("value");

            // Create the endpoint for the clicked drink
            const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${clickedDrinkId}`;

            // Fetch the clicked drink
            try {
                const response = await fetch(endpoint);

                // Convert the response to JSON
                const data = await response.json();
                console.log(data);

                // Store the recipe data in local storage
                let jsonData = localStorage.setItem("recipe", JSON.stringify(data.drinks[0]));
                console.log(jsonData);

                // Display the recipe data
                const resultEl = document.querySelector("#results-container");
                console.log(resultEl, "Result Element")

                // If there is a result element, create the recipe name and image
                if (resultEl) {
                    resultEl.innerHTML = data.drinks[0].strInstructions;
                    const recipeData = encodeURIComponent(data.drinks[0].strInstructions);
                    
                    // Redirect to results page
                    window.location.href = `results.html`;
                } else {
                    console.error("No results element found");
                }
            } catch (err) {
                console.error(err);
            }
        }
    });
});
