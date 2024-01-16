import DataSource from "../data/data-source.js";

class PokeCard extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	async render(searchTerm = "") {
		console.log("Search term in PokeCard:", searchTerm);
		try {
			// Fetch a list of Pokémon names or IDs from the DataSource
			const pokemonList = await DataSource.getListOfPokemons();

			// Fetch data for each Pokémon in parallel
			const pokemonDataList = await Promise.all(
				pokemonList.map((nameOrId) => DataSource.searchPoke(nameOrId))
			);

			// Filter Pokémon based on the search term
			const filteredPokemonList = pokemonDataList.filter((pokemon) =>
				pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
			);

			// Create HTML for each Pokémon card and join them
			const cardsHtml = filteredPokemonList
				.map((pokemon) => this.createCardHtml(pokemon))
				.join("");

			// Set the innerHTML of the custom element to display the Pokémon cards
			this.innerHTML = `
                <div class="row">
                    ${cardsHtml}
                </div>
            `;
		} catch (error) {
			console.error("Error rendering Pokémon cards:", error);
		}
	}

	createCardHtml(pokemon) {
		const imageUrl = pokemon.sprites.front_default;
		const name = pokemon.name;
		const type = pokemon.types.map((type) => type.type.name).join(", ");
		const height = pokemon.height;
		const weight = pokemon.weight;
		const abilities = pokemon.abilities
			.map((ability) => ability.ability.name)
			.join(", ");

		return `
        <div class="col-lg-2 col-md-3 col-sm-4 col-6">
            <div class="card text-center mb-3" style="width: 12rem;">
                <div class="card-body">
                    <img src="${imageUrl}" alt="${name}"><br>
                    <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal-${name}">${name}</a>
                    <div class="modal fade" id="exampleModal-${name}" tabindex="-1" aria-labelledby="exampleModalLabel-${name}" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel-${name}">Pokemon Detail</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col">
                                            <img src="${imageUrl}" width="50%" alt="">
                                        </div>
                                        <div class="col mt-4">
                                            <div class="row">
                                                <div class="col">
                                                    <h4>${name}</h4>
                                                </div>
                                                <div class="col">
                                                    <p>${type}</p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col">
                                                    <p>Height: ${height}</p>
                                                </div>
                                                <div class="col">
                                                    <p>Weight: ${weight}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ability">
                                        <span>Abilities:</span>
                                        <p>${abilities}</p>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="card-text">${type}</p>
                </div>
            </div>
        </div>
    `;
	}
}

customElements.define("poke-card", PokeCard);
