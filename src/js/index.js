// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import "bootstrap";

// Import the SVG file
import searchSvg from "../img/search.svg";

import "./component/navbar.js";
import "./component/searchbar.js";
import "./component/pokecard.js";

// Find the existing div with the class 'col-6' and 'img'
const imgDiv = document.querySelector(".col-lg-6.img");

// Create an image element
const imgElement = document.createElement("img");
imgElement.src = searchSvg;
imgElement.alt = "img";

// Append the image element to the existing div
imgDiv.appendChild(imgElement);

const searchBar = document.querySelector("search-bar");
const pokeCard = document.querySelector("poke-card");

searchBar.addEventListener("search", (event) => {
	const searchTerm = event.detail;
	pokeCard.render(searchTerm);
});
