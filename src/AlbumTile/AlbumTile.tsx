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
            <img
                className="coverArt"
                alt={name}
                 src={`src/assets/mp3/${folder}/cover.${imageFormat}`}/>
            <h2 className="albumName">{name}</h2>
            <h3 className="subtitle">{subname}</h3>
        </div>
    )
}

export default AlbumTile