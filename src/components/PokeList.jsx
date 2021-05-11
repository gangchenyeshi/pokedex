import React, { useState, useEffect } from "react";
import PokeThumbnail from "./PokeThumbnail";
import "../css/PokeList.css"

const PokeList = (props) => {
    const [pokemonList, setPokemonList] = useState([]);
    const [page, setPage] = useState(0);
    const [numberOfPage, setNumberOfPage] = useState(0);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${page}`)
            .then((res) => { return res.json() })
            .then((data) => {
                // console.log(data);
                setPokemonList(data.results);
                setNumberOfPage(Math.floor(data.count / 100))
            })
    }, [page]); //now useEffect depend at page var, 

    const previousPage = () => {
        // console.log("previousPage click")
        if (page >= 100) {
            setPage(page - 100)
        }
    };

    const nextPage = () => {
        // console.log("nextPage click")
        setPage(page + 100)
    };

    const paginationClick =()=> {
        const pages = [];
        for(let i = 0; i < numberOfPage; i ++){
            pages.push(
                <li class="page-item">
                    <button class="page-link" onClick={() => setPage( i * 100)}>
                        {i + 1}
                    </button>
                </li>
            )
        }
        return pages;
    }
    return (
        <div className="pokemon-List">
            <div className="container-fluid">

                <div className="row">
                    {pokemonList.map((pokemon) => {
                        return (
                            // when i click on the pokemon then pokeInfo will set to that specific pokemon, we did this in App.js 
                            <div className="col-6 col-md-4 col-lg-3 pokeThumb"
                                onClick={() => { props.onPokemonClick(pokemon) }}>
                                <PokeThumbnail pokemon={pokemon} />
                            </div>
                        )
                    })}
                </div>
                <div className="pokemonListButton">
                    <div className="pokemonListButtonsContainer">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item">
                                <button class="page-link" aria-label="Previous" onClick={previousPage}>
                                    <span aria-hidden="true">&laquo;</span>
                                </button>
                            </li>
                            {paginationClick()}
                            <li class="page-item">
                                <button class="page-link" aria-label="Next" onClick={nextPage}>
                                    <span aria-hidden="true">&raquo;</span>
                                </button>
                            </li>
                        </ul>
                    </nav>

                    </div>
                </div>
            </div>

        </div>
    )
}
export default PokeList;