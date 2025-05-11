export async function fetchPokemonList(offset = 0, limit = 10) {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    if (!res.ok) {
      throw new Error("Failed fetching data Pokemon: ${res.status}");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
}

export function getPokemonImage(id: Number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}
