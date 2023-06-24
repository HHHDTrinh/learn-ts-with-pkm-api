export interface PokemonsByName {
    name: string;
    url: string;
}
  
export interface Pokemons {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    }
}

export interface PokemonAbility extends Pokemons {
    abilities?: { //because some pkm have no ability
        ability: string;
        name: string;
    }[]
}

export interface PokemonDetails {
    id: number;
    isOpened: boolean;
}