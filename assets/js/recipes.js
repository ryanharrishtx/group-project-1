// recipes.js

document.addEventListener("DOMContentLoaded", () => {
    const resultsContainer = document.getElementById("results-container");

    resultsContainer.addEventListener("click", async (event) => {
        if (event.target.classList.contains("recipe-button")) {
            const clickedDrinkId = event.target.getAttribute("value");
            const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${clickedDrinkId}`;

            try {
                const response = await fetch(endpoint);
                const data = await response.json();
                console.log(data);
                // Handle the recipe data here, e.g., display it on the page.
                window.location.replace("./results.html");
                const resultEl = document.querySelector("#results");
                if (resultEl) {
                    resultEl.innerHTML = data.drinks[0].strInstructions;
                } else {
                    console.error("No results element found");
                }
            } catch (err) {
                console.error(err);
            }
        }
    });
});

// const recipeData = encodeURIComponent(data.drinks[0].strInstructions);
//                 window.location.href = `recipe.html?recipe=${recipeData}`;