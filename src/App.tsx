import React from 'react';
import './App.css';
import axios from 'axios';

import PokemonCollection from './components/PokemonCollection';
import { Pokemons, PokemonsByName, PokemonDetails } from './interfaces/pokemons';

const App: React.FC = () => {
  const [pokemons, setPokemons] = React.useState<Pokemons[]>([]);
  const [nextUrl, setNextUrl] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [viewDetails, setViewDetails] = React.useState<PokemonDetails>({
    id: 0,
    isOpened: false
  })
  
  React.useEffect(() => {
    const getPokemons = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20");
      setNextUrl(res.data.next);
      res.data.results.forEach(async(pkm: PokemonsByName) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pkm.name}`)
        setPokemons((p) => [...p, poke.data]);
        setLoading(false);
      })
    }
    getPokemons();
    return () => setPokemons([]);
  }, []);

  const handleLoadMore = async () => {
    setLoading(true);
    let res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    res.data.results.forEach(async(pkm: PokemonsByName) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pkm.name}`)
      setPokemons((p) => [...p, poke.data]);
      setLoading(false);
    })
  }

  return (
    <main className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <PokemonCollection pokemons={pokemons} viewDetails={viewDetails} setViewDetails={setViewDetails} />
        {!viewDetails.isOpened && (
          <div className="btn">
            <button onClick={handleLoadMore}>
              {loading ? "Loading..." : "Load more"}{" "}
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export default App;
