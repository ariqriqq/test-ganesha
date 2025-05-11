import ClientPokemonList from "./pokemon-list";
import { fetchPokemonList } from "@/api/pokemon-api";

export default async function PokemonPage() {
  // const res = await fetch(
  //   "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10"
  // );
  // const data = await res.json();
  // console.log(data);

  const data = await fetchPokemonList(0, 10);

  return <ClientPokemonList initialData={data} />;
}
