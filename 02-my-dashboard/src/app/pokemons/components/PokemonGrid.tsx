import { PokemonCard, SimplePokemon } from "@/app/pokemons"

interface Props {
  pokemons: SimplePokemon[];
}

export function PokemonGrid({ pokemons }: Props) {
  return (
    <div className="flex flex-wrap gap-10 items-center justify-center">

      {
        pokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))
      }
    </div>
  )
}
