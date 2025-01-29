import './AlbumTile.css'
import {Link} from "react-router-dom";

interface AlbumTileProps {
    name: string,
    folder: string,
    subname: string,
    titleHidden?: boolean | undefined,
    cdnLink : string | undefined
}

function AlbumTile({name, folder, subname, titleHidden, cdnLink}: AlbumTileProps) {

    return (
            <div className={"albumTile"}>
                <Link to={`/${folder}`}>
                <img
                    className="coverArt"
                    alt={name}
                    src={`${cdnLink}/mp3/${folder}/cover-small.webp`} />
                <div data-title-hidden={titleHidden}>
                    <h2 className="albumName">{name}</h2>
                    <h3 className="subtitle">{subname}</h3>
                </div>
                </Link>
            </div>

    )
}

export default AlbumTile