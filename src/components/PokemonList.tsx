import { useState, useEffect } from 'react';

import { PokemonDetails } from "../interfaces/pokemons";

interface Props {
    name: string;
    id: number;
    image: string;
    abilities: | {
        name: string;
        ability: string;
    }[] | undefined;
    viewDetails: PokemonDetails;
    setViewDetails: React.Dispatch<React.SetStateAction<PokemonDetails>>
}

const PokemonList:React.FC<Props> = (props) => {
    const {name, id, image, abilities, viewDetails, setViewDetails} = props;

    const [isSelected, setSelected] = useState<boolean>(false);

    useEffect(() => {
      setSelected(id === viewDetails?.id);
    }, [viewDetails])
    

  return (
    <div className="">
        {isSelected ? (
            <section className="pokemon-list-detailed">
                <div className="detail-container">
                    <p className="detail-close" onClick={() => setViewDetails({id: 0, isOpened: false})}>X</p>
                    <div className="detail-info">
                        <img src={image} alt={name} className='detail-img' />
                        <p className="detail-name">{name}</p>
                    </div>
                    <div className="detail-skill">
                        <p className="detail-ability">Abilities:</p>
                        {abilities?.map((ab: any) => {
                            return (
                                <div key={ab.name} className="">{ab.ability.name}</div>
                            )
                        })}
                    </div>
                </div>
            </section>
        ) : (
            <section className="pokemon-list-container">
                <p className="pokemon-name">{name}</p>
                <img src={image} alt={name} />
            </section>
        )}
    </div>
  )
}

export default PokemonList