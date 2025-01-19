import "./Artist.css"
import {useContext} from "react";
import {MetadataContext} from "../MetadataContext/MetadataContext.tsx";

function Artist() {
    const artistName = useContext(MetadataContext)?.artistName
    return <h1 className="artist">{artistName}</h1>
}

export default Artist