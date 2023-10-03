// API LINKS:
// Cocktail Database:
// https://rapidapi.com/thecocktaildb/api/the-cocktail-db/
// Wiki API:
// https://www.mediawiki.org/wiki/API:Main_page



let cocktailDBAPIKey = "000769ddcamsh5836fbe556e139ap100c26jsnaf07c3af13fa";
let liquorOptions = ["Vodka", "Gin", "Whiskey", "Tequila", "Rum"];

document.addEventListener("DOMContentLoaded", () => {
    let container = document.getElementById("button-container");

    function createButton() {
        for (let i = 0; i < liquorOptions.length; i++) { 
            let button = document.createElement("button");
            button.setAttribute("id", "value-button");
            button.setAttribute("type", "button");
            button.setAttribute("value", liquorOptions[i]);
            button.textContent = liquorOptions[i].toUpperCase();
            container.appendChild(button);

            console.log(button);
        }
    };
createButton();

    let valueButton = document.querySelectorAll("button");
    valueButton.forEach((button) => {
        button.addEventListener("click", (event) => {
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
                    let drinkListItem = document.createElement("card");
                    drinkListItem.setAttribute("id", "drink-list-item");
                    drinkListItem.setAttribute("class", "card");
                    drinkListItem.setAttribute("style", "width: 18rem;");
                    let drinkImage = document.createElement("img");
                    drinkImage.setAttribute("src", data.drinks[i].strDrinkThumb);
                    let drinkImageSrc = drinkImage.getAttribute("src");
                    console.log(drinkImageSrc);
                    let drinkName = data.drinks[i].strDrink.toUpperCase();
                    drinkListItem.innerHTML = `<img src="${drinkImageSrc}" /> ${drinkName}`;
                    drinkList.appendChild(drinkListItem);
                    console.log(drinkListItem);
                }
            })
            .catch((error) => {
                console.log(error);
            })
        })
    })
});