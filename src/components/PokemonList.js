import PokemonTile from "./PokemonTile";

function PokemonList({data}) {
    return (
        <tbody>
        {
            data.map(({name, url}) => {
                return <PokemonTile key={name} name={name} url={url}/>
            })
        }
        </tbody>
    )
}

export default PokemonList;