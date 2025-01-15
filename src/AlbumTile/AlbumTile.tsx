import './AlbumTile.css'

interface AlbumTileProps {
    name: string,
    folder: string,
    subname: string,
    imageFormat: string,
    titleHidden?: boolean | undefined,
    cdnLink : string | undefined
}

function AlbumTile({name, folder, subname, imageFormat, titleHidden, cdnLink}: AlbumTileProps) {

    return (
        <div className={"albumTile"}>
            <img
                className="coverArt"
                alt={name}
                src={`${cdnLink}/mp3/${folder}/cover.${imageFormat}`} />
            <h2 className="albumName" data-title-hidden={titleHidden}>{name}</h2>
            <h3 className="subtitle">{subname}</h3>
        </div>
    )
}

export default AlbumTile