import {Link} from "react-router-dom";
import {AlbumMetadata} from "../App/App.tsx";
import {useContext} from "react";
import {MetadataContext} from "../MetadataContext/MetadataContext.tsx";

interface AlbumInfoProps {
    album? : AlbumMetadata
}

function AlbumInfo({album} : AlbumInfoProps)
{
    const metadata = useContext(MetadataContext)
    return <div className="albumInfoPanel">
        <Link to={`/${album?.folder}`}>
            <img
                className={`coverArt largeCoverArt ${album?.noBorderOnCover ? "no-border" : ""}`}
                alt={album?.title}
                src={
                    `${metadata?.cdnLink}/mp3/${album?.folder}/` +
                    ( album?.specialCover? "cover-album-page.webp" : "cover-small.webp")
                } />
            <div data-title-hidden={album?.titleHidden}>
                {
                    !(album?.hideTitleOnPage) &&
                        <h2 className={"albumName"}>{album?.title}</h2>
                }
                <h3 className={"subtitle"}>{album?.subtitle}</h3>
            </div>
        </Link>
        {album?.sideB &&
            <Link to={`/${album?.sideB}`}>
                <small data-title-hidden={album?.titleHidden}>alt</small>
            </Link>
        }
    </div>
}

export default AlbumInfo