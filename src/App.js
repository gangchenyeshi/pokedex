import React, { useState } from "react";
import PokeInfo from "./components/PokeInfo";
import PokeList from "./components/PokeList";
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState({
    name: "bulbasaur", //default PokeInfo load the first pokemon name and url
    url: "https://pokeapi.co/api/v2/pokemon/1/"
  });
  return (
    <div className="">
      <div className="row">
        <div className="col-12">
          <PokeInfo pokemons={pokemon} />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <PokeList onPokemonClick={setPokemon} />
        </div>
      </div>



    </div>
  );
}

export default App;
