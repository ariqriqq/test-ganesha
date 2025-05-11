// "use client";

// import { useEffect, useState } from "react";
import ClientPokemonList from "./pokemon-list";

export default async function PokemonPage() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10"
  );
  const data = await res.json();
  console.log(data);

  return <ClientPokemonList initialData={data} />;
}
