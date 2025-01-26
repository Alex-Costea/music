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
    return <div className="part1">
        <Link to={`/${album?.folder}`}>
            <img
                className={`coverArt largeCoverArt ${album?.noBorderOnCover ? "no-border" : ""}`}
                alt={album?.title}
                src={
                    `${metadata?.cdnLink}/mp3/${album?.folder}/` +
                    ( album?.specialBackground? "cover-album-page.webp" : "cover-small.webp")
                } />
            {
                !(album?.hideTitleOnPage ) &&
                <h2 className={"albumName"} data-title-hidden={album?.titleHidden}>{album?.title}</h2>
            }
            <h3 className={"subtitle"} data-title-hidden={album?.titleHidden}>{album?.subtitle}</h3>
        </Link>
    </div>
}

export default AlbumInfo