import {createContext} from "react";
import {Metadata} from "../App/App.tsx";

export const MetadataContext = createContext<Metadata | null> (null)
