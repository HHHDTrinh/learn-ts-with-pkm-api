import React from 'react';

import { PokemonDetails, PokemonAbility } from '../interfaces/pokemons';
import PokemonList from './PokemonList';

interface Props {
    pokemons: PokemonAbility[];
    viewDetails: PokemonDetails;
    setViewDetails: React.Dispatch<React.SetStateAction<PokemonDetails>>
}

const PokemonCollection:React.FC<Props> = (props) => {
    const {pokemons, viewDetails, setViewDetails} = props;

    const handleSelectPokemon = (id: number) => {
        if (!viewDetails.isOpened) {
            setViewDetails({
              id: id,
              isOpened: true,
            });
        }
    }
  return (
    <>
        <section className={
          viewDetails.isOpened
            ? "collection-container-active"
            : "collection-container"
        }>  
            {viewDetails.isOpened ? (
                <div className="overlay"></div>
            ) : (
                <div className=""></div>
            )}
            {pokemons.map((pkm) => (
                <div key={pkm.name} onClick={() => handleSelectPokemon(pkm.id)}>
                    <PokemonList
                        key={pkm.id}
                        viewDetails={viewDetails}
                        setViewDetails={setViewDetails}
                        name={pkm.name}
                        id={pkm.id}
                        abilities={pkm.abilities}
                        image={pkm.sprites.front_default}
                    />
                </div>
            ))}
        </section>
    </>
  )
}

export default PokemonCollection