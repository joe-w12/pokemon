import {useEffect, useState} from "react";

async function fetchSpriteUrl(pokemonUrl, {signal}) {
    const response = await fetch(pokemonUrl, {signal});

    const {sprites: {front_default}} = await response.json();

    return front_default;
}

function PokemonTile({name, url}) {
    const [spriteUrl, setSpriteUrl] = useState();

    useEffect(() => {
        const controller = new AbortController()

        fetchSpriteUrl(url, controller)
            .then(setSpriteUrl)
            .catch(console.error);

        return () => controller.abort();
    }, [url]);

    console.log(url);

    return (
        <div>
            <p>{name}</p>
            {spriteUrl && <img src={spriteUrl} alt={name}/>}
        </div>
    )
}

export default PokemonTile;