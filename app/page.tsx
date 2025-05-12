import ClientPokemonList from "./pokemon-list";
import { fetchPokemonList } from "@/api/pokemon-api";

export default async function PokemonPage() {
  const data = await fetchPokemonList(0, 10);

  return <ClientPokemonList initialData={data} />;
}
