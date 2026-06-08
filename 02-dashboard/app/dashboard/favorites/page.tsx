import { FavoritePokemons } from "@/pokemons";
import { cacheLife } from "next/cache";

export const metadata = {
  title: "Favoritos",
  description: "Listado de pokemons favoritos",
};

export default async function PokemonsPage() {
  "use cache";
  cacheLife({
    stale: 10,
    revalidate: 60,
  });

  return (
    <div className="flex flex-col p-2 ">
      <span className="text-5xl my-2">
        Pokemon favoritos con{" "}
        <small className="text-blue-500">estado global</small>
      </span>

      <div className="flex flex-wrap gap-10 items-center justify-center">
        {/* El componente FavoritePokemons se encarga de obtener los pokemons favoritos, es un
        componente del lado del cliente porque se va a utilizar el store de Redux y como este
        componente tiene metadata si o si debe ser un componente del lado del servidor */}
        {/* <PokemonGrid pokemons={[]} /> */}
        <FavoritePokemons />
      </div>
    </div>
  );
}
