import {useParams} from "react-router-dom";
import { MetadataContext } from "../MetadataContext/MetadataContext.tsx";
import {useContext} from "react";

function Album() {
    const {folder} = useParams()
    const metadata = useContext(MetadataContext)
    const album = metadata?.albums.filter(it => it.folder === folder)[0]
    return <MetadataContext.Provider value={metadata}>
        {album &&
            <h2>{album.title}</h2>
        }
    </MetadataContext.Provider>
}

export default Album