import './AlbumTile.css'

interface AlbumTileProps {
    name: string,
    folder: string,
    subname: string,
    imageFormat : string
}

function AlbumTile({name, folder, subname, imageFormat}: AlbumTileProps) {

    return (
        <div className={"albumTile"}>
            <img alt={name}
                 src={`src/assets/mp3/${folder}/cover.${imageFormat}`}
                 width={"200px"}/>
            <h2>{name}</h2>
            <h3>{subname}</h3>
        </div>
    )
}

export default AlbumTile