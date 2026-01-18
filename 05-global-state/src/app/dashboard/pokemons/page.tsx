import { PokemonGrid, PokemonsResponse, SimplePokemon } from "@/pokemons";

export const metadata = {
  title: `151 Pokémons`,
  description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora harum eum obcaecati dolores, necessitatibus nemo animi magnam! Dolorem amet numquam, suscipit quisquam libero, ratione eveniet explicabo nulla soluta delectus tenetur?`
}

const getPokemons = async (limit = 20, offset = 0): Promise<SimplePokemon[]> => {
  const data: PokemonsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
  .then(res => res.json());

  const pokemons = data.results.map(pokemon => ({
    id: pokemon.url.split('/').at(-2)!,
    name: pokemon.name
  }))

  // throw new Error('Esto es un error que no deberia de suceder')

  return pokemons;
}

export default async function PokemonsPage() {

  const pokemons = await getPokemons(151);

  return (
    <div className="flex flex-col">
      <span className="p-2 text-5xl my-2">Listado de Pokémons <small className="text-blue-500">estático</small></span>

      <PokemonGrid pokemons={pokemons}/>
    </div>
  )
}
