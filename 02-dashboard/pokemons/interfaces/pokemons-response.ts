// Para obtener el tipado de la respuesta de la API de PokeAPI

// Primero copia el JSON de la respuesta de la API que se obtiene de:
// https://pokeapi.co/api/v2/pokemon?limit=151&offset=1

// En Windsurf pulsa F1 y escribe 'Paste JSON as Code' y seleccionalo
// Escribe un nombre para la interface, por ejemplo: 'PokemonResponse'

// El JSON copiado se convertira en interfaces de TypeScript

export interface PokemonResponse {
  count: number;
  next: string;
  previous: string;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}

// Fue generado con la extensión "Paste JSON as Code" de Windsurf
