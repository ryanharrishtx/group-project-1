// search.js

let cocktailDBAPIKey = "000769ddcamsh5836fbe556e139ap100c26jsnaf07c3af13fa";
let liquorOptions = ["Vodka", "Gin", "Whiskey", "Tequila", "Rum"];

document.addEventListener("DOMContentLoaded", () => {
    let container = document.getElementById("button-container");

    function createButton() {
        for (let i = 0; i < liquorOptions.length; i++) {
            let button = document.createElement("button");
            button.setAttribute("class", "value-button");
            button.setAttribute("type", "button");
            button.setAttribute("value", liquorOptions[i]);
            button.textContent = liquorOptions[i].toUpperCase();
            container.appendChild(button);
        }
    }

    createButton();

    container.addEventListener("click", (event) => {
        if (event.target.classList.contains("value-button")) {
            document.getElementById("input-container").style.display = "none";
            const buttonValue = event.target.getAttribute("value").toLowerCase();
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${buttonValue}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                document.getElementById("title").innerText = `Drinks made with ${buttonValue}:`
                let drinkContainer = document.getElementById("results-container");
                drinkContainer.innerHTML = "";
                let drinkList = document.createElement("div");
                drinkList.setAttribute("id", "drink-list");
                drinkContainer.appendChild(drinkList);

                for (let i = 0; i < data.drinks.length; i++) {
                    let drinkListItem = document.createElement("div"); // Changed "card" to "div"
                    drinkListItem.setAttribute("class", "drink-list-item card"); // Add card class
                    drinkListItem.setAttribute("style", "width: 18rem;");
                    let drinkImage = document.createElement("img");
                    drinkImage.setAttribute("src", data.drinks[i].strDrinkThumb);
                    let drinkImageSrc = drinkImage.getAttribute("src");
                    console.log(drinkImageSrc);
                    let drinkName = data.drinks[i].strDrink.toUpperCase();
                    let recipeButton = document.createElement("button");
                    recipeButton.setAttribute("class", "recipe-button"); // Use class instead of ID
                    recipeButton.setAttribute("type", "button");
                    recipeButton.setAttribute("value", data.drinks[i].idDrink); // Use the drink ID as value
                    recipeButton.textContent = "RECIPE";
                    drinkListItem.innerHTML = `<img src="${drinkImageSrc}" /> ${drinkName} ${recipeButton.outerHTML}`;
                    drinkList.appendChild(drinkListItem);

                    // Moved the event listener outside the loop
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    });
});
