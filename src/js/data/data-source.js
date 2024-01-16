class DataSource {
	static async getListOfPokemons() {
		try {
			const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=42"); // Adjust the limit as needed
			const data = await response.json();
			return data.results.map((pokemon) => pokemon.name);
		} catch (error) {
			throw new Error("Failed to fetch list of Pokémon");
		}
	}

	static searchPoke(keyword) {
		return fetch(`https://pokeapi.co/api/v2/pokemon/${keyword}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Failed to fetch data for ${keyword}`);
				}
				return response.json();
			})
			.then((responseJson) => {
				if (responseJson.name) {
					return Promise.resolve(responseJson);
				} else {
					return Promise.reject(`Pokemon with ID or name ${keyword} not found`);
				}
			})
			.catch((error) => {
				console.error("Error:", error);
				return Promise.reject("Failed to fetch data");
			});
	}
}

export default DataSource;
