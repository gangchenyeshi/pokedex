import React, { useState, useEffect } from "react";
import "../css/PokeInfo.css";
import SelectSearch from 'react-select-search';

const PokeInfo = (props) => {
    const [pokemonDetail, setPokemonDetail] = useState();
    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState();

    useEffect(() => {
        if (props.pokemons) { //props.pokemon is props of App.js fetch pokemon from App.js
            fetch(props.pokemons.url)
                .then(res => { return res.json() })
                .then((data) => {
                    // console.log(data);
                    setPokemonDetail(data);
                })
        }
    }, [props.pokemons]);

    useEffect(() => {
        if(search) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
            .then((res) => {return res.json()})
            .then((data) => {
                // console.log(data);
                setPokemonDetail(data)
            })
        }
    }, [search]);

    useEffect(() => { // this useEffect is for search all the pokemon
        fetch("https://pokeapi.co/api/v2/pokemon?limit=1118")
            .then((res) => { return res.json() })
            .then((data) => {
                // console.log(data);
                setOptions(data.results.map((result) => {
                    return { name: result.name, value: result.name }
                }));
            })
    });

    

    const onSearch = (pokemonName) => {
        // console.log(pokemonName);
        setSearch(pokemonName);
    }
    return (
        <div className="pokemon-info">

            {pokemonDetail ?
                (<div className="container-fluid box-top">
                    <div className="row">
                        <SelectSearch onChange={onSearch} 
                                      options={options} 
                                      value={search} 
                                      placeholder="Choose your Pokemon" />
                    </div>
                    <div className="row ">
                        <div className="col-6 pokeThumb">
                            <img src={pokemonDetail.sprites.front_default} alt={pokemonDetail.name} className="poke-image-info" />
                        </div>
                        <div className="col-6">
                            <p>Name : {pokemonDetail.name}</p>
                            <p>Height : {pokemonDetail.height}</p>
                            <p>Weight : {pokemonDetail.weight} kg</p>
                            <p>Types : {pokemonDetail.types.map((type) => { return type.type.name; }).join(', ')}</p>
                            {/* types it is a object so use map method, then used method join because it has a multiple types .join(', ') */}
                        </div>
                    </div>
                </div>)
                :
                (<h2>Loading...</h2>)
            }

        </div>
    )
}
export default PokeInfo;