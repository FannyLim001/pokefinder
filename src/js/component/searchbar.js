// SearchBar.js
class SearchBar extends HTMLElement {
	connectedCallback() {
		this.render();
		this.setupEventListeners();
	}

	render() {
		this.innerHTML = `
            <div class="search-bar">
                <input class="form-control" type="search" placeholder="Search" aria-label="Search">
            </div>
        `;
	}

	setupEventListeners() {
		const inputElement = this.querySelector("input");

		inputElement.addEventListener("input", (event) => {
			const searchTerm = event.target.value;
			console.log("Search term:", searchTerm);
			this.dispatchEvent(new CustomEvent("search", { detail: searchTerm }));
		});
	}
}

customElements.define("search-bar", SearchBar);
