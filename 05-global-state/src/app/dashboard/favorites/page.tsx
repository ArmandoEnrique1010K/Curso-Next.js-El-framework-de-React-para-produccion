import { PokemonGrid } from "@/pokemons";

export const metadata = {
    title: `Favoritos`,
    description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora harum eum obcaecati dolores, necessitatibus nemo animi magnam! Dolorem amet numquam, suscipit quisquam libero, ratione eveniet explicabo nulla soluta delectus tenetur?`
}

export default async function FavoritePage() {
    return (
        <div className="flex flex-col">
            <span className="p-2 text-5xl my-2">Pokemons Favoritos <small className="text-blue-500">Global State</small></span>

            <PokemonGrid pokemons={[]} />
        </div>
    )
}
