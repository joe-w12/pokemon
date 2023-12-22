import {useEffect, useState} from "react";
import PokemonList from "./PokemonList";

const PAGE_SIZE = 10;

async function getPokemonData(page, {signal}) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${page * PAGE_SIZE}&limit=${PAGE_SIZE}`, {signal});

    return await response.json();
}

function PokemonPage() {
    const [pokemonData, setPokemonData] = useState();
    const [page, setPage] = useState(0);

    useEffect(() => {
        const controller = new AbortController()

        setPokemonData(undefined);

        getPokemonData(page, controller)
            .then(setPokemonData)
            .catch(console.error);

        return () => controller.abort();
    }, [page]);

    if (!pokemonData) {
        return <p>Loading...</p>
    }

    const numberOfPages = Math.ceil(pokemonData.count / PAGE_SIZE);

    return (
        <>
            <div>
                <label htmlFor="page">Page Number</label>
                <select onChange={({target: {value}}) => setPage(parseInt(value))} value={page} name="page">
                    {new Array(numberOfPages - 1).fill(0).map((_, pageNumber) => {
                        return (
                            <option key={pageNumber} value={pageNumber}>
                                {pageNumber + 1}
                            </option>
                        )
                    })}
                </select>
            </div>
            <div>
                <PokemonList data={pokemonData.results}/>
            </div>
        </>
    )
}

export default PokemonPage;