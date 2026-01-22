'use client'

import { useAppSelector } from "@/store"
import { PokemonGrid } from "./PokemonGrid"
import { IoHeartOutline } from "react-icons/io5";
import { useMemo } from "react";

export const FavoritePokemons = () => {

    // const favoritePokemons = useAppSelector(state => Object.values(state.pokemons.favorites));
    // console.log(favoritePokemons)

    // const [pokemons, setPokemons] = useState(favoritePokemons);
    // 
    // useEffect(() => {
    //     // console.log({favoritePokemons})
    //     setPokemons(favoritePokemons)
    // },[favoritePokemons])

    // <PokemonGrid pokemons={ favoritePokemons } /> 

    const favoritePokemons = useAppSelector(state => state.pokemons.favorites);
    const pokemons = useMemo(() => Object.values(favoritePokemons), [favoritePokemons]);




    return (
        <>
            {
                pokemons.length === 0 ? (
                    <NoFavorites />
                ) : (
                    <PokemonGrid pokemons={pokemons} />
                )
            }

        </>

    )
}

export const NoFavorites = () => {
    return (
        <div className="flex flex-col h-[50vh] items-center justify-center">
            <IoHeartOutline size={100} className="text-red-500" />
            <span>No hay favoritos</span>
        </div>
    )
}