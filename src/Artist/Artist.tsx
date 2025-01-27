import "./Artist.css"
import {useContext} from "react";
import {MetadataContext} from "../MetadataContext/MetadataContext.tsx";
import {Link} from "react-router-dom";

function Artist() {
    const artistName = useContext(MetadataContext)?.artistName
    return <h1 className="artist"><Link to={"/"}>{artistName}</Link></h1>
}

export default Artist