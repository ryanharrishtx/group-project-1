let cocktailDBAPIKey = "000769ddcamsh5836fbe556e139ap100c26jsnaf07c3af13fa";
let liquorOptions = ["Vodka", "Gin", "Whiskey", "Tequila", "Rum"];

document.addEventListener("DOMContentLoaded", () => {
    let container = document.getElementById("button-container");

    // Create buttons for each liquor option in liquorOptions array
    function createButton() {
        // Loop through the liquorOptions array
        for (let i = 0; i < liquorOptions.length; i++) {

            // Create a button element
            let button = document.createElement("button");

            // Give it a class of value-button
            button.setAttribute("class", "value-button");

            // Give it a type of button
            button.setAttribute("type", "button");

            // Give it a value of the liquor option
            button.setAttribute("value", liquorOptions[i]);

            // Set the text content to the liquor option
            button.textContent = liquorOptions[i].toUpperCase();

            // Append the button to the container
            container.appendChild(button);
        }
    }
    // Call the createButton function
    createButton();

    container.addEventListener("click", (event) => {
        // If the clicked element has a class of value-button
        if (event.target.classList.contains("value-button")) {

            // Hide the input container
            document.getElementById("input-container").style.display = "none";

            // Get the value of the clicked button
            const buttonValue = event.target.getAttribute("value").toLowerCase();

            // Fetch the drinks made with the clicked liquor option
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${buttonValue}`)

            // Convert the response to JSON
            .then((response) => response.json())

            // Display the drinks
            .then((data) => {
                console.log(data);

                // Grab the results container
                let drinkContainer = document.getElementById("results-container");

                // Clear the results container
                drinkContainer.innerHTML = "";

                // Create a div to hold the drinks
                let drinkList = document.createElement("div");

                // Give it an ID of drink-list
                drinkList.setAttribute("id", "drink-list");

                // Append the drink list to the results container
                drinkContainer.appendChild(drinkList);

                // Loop through the drinks
                for (let i = 0; i < data.drinks.length; i++) {

                    // Create a div for each drink
                    let drinkListItem = document.createElement("div");

                    // Give it a class of drink-list-item
                    drinkListItem.setAttribute("class", "drink-list-item card");

                    // Set the width to 18rem
                    drinkListItem.setAttribute("style", "width: 18rem;");

                    // Create an img element for the drink image
                    let drinkImage = document.createElement("img");

                    // Give it a class of drink-image
                    drinkImage.setAttribute("src", data.drinks[i].strDrinkThumb);

                    let drinkImageSrc = drinkImage.getAttribute("src");
                    console.log(drinkImage);

                    // Append the drink image to the drink list item
                    let drinkName = data.drinks[i].strDrink.toUpperCase();

                    // Create a button for the recipe
                    let recipeButton = document.createElement("button");

                    // Give it a class of recipe-button
                    recipeButton.setAttribute("class", "recipe-button");

                    // Give it a type of button
                    recipeButton.setAttribute("type", "button");

                    // Give it a value of the drink ID
                    recipeButton.setAttribute("value", data.drinks[i].idDrink);

                    // Set the text content to RECIPE
                    recipeButton.textContent = "RECIPE";

                    // Append the recipe button to the drink list item
                    drinkListItem.innerHTML = `<img src="${drinkImageSrc}" /> ${drinkName} ${recipeButton.outerHTML}`;

                    // Append the drink list item to the drink list
                    drinkList.appendChild(drinkListItem);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    });
});
