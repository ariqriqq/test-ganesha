"use client";

import { useEffect, useState } from "react";
import { fetchPokemonList, getPokemonImage } from "@/api/pokemon-api";

type Pokemon = { name: string; url: string };
type PokeAPIResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};

export default function ClientPokemonList({
  initialData,
}: {
  initialData: PokeAPIResponse;
}) {
  const [data, setData] = useState<PokeAPIResponse>(initialData);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetchPokemonList(offset, limit);
      setData(result);
      setLoading(false);
    };

    if (!(offset === 0 && limit === 10)) {
      fetchData();
    } else {
      setData(initialData);
    }
  }, [offset, limit]);

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value, 10);
    setLimit(newLimit);
    setOffset(0);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center border-2 rounded-full">
        Pokemon List
      </h1>

      {loading && (
        <div className="flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {!loading && data && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {data.results.map((pokemon) => {
              const id = Number(pokemon.url.split("/").filter(Number).pop());
              const imageUrl = getPokemonImage(id);

              return (
                <div
                  key={pokemon.name}
                  className="bg-white border rounded-xl shadow-sm p-4 hover:shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl text-center capitalize"
                >
                  <div className="flex-1 flex flex-col items-center">
                    <img
                      src={imageUrl}
                      alt={pokemon.name}
                      className="mx-auto mb-2 w-24 h-24 transition-transform duration-300 ease-in-out transform hover:scale-125"
                    />
                  </div>
                  <footer className="mt-2 w-full border-t pt-2">
                    <p className="text-xs text-gray-500 font-thin">#{id}</p>
                    <h2 className="text-lg font-semibold">{pokemon.name}</h2>
                  </footer>
                </div>
              );
            })}
          </div>

          {/* pagination */}

          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-2">
            <div className="flex gap-2 mb-5">
              <label htmlFor="limit" className="font-medium">
                Per page:
              </label>
              <select
                id="limit"
                value={limit}
                onChange={handleLimitChange}
                className="p-2 border rounded w-full sm:w-auto"
              >
                {[10, 20, 30].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setOffset(0)}
                disabled={!data.previous}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-blue-400 hover:text-white hover:shadow-lg"
              >
                First
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setOffset(Math.max(0, offset - limit))}
                disabled={!data.previous}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-blue-400 hover:text-white hover:shadow-lg"
              >
                Previous
              </button>
              <button
                onClick={() => setOffset(offset + limit)}
                disabled={!data.next}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-blue-400 hover:text-white hover:shadow-lg"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
