import {createContext} from "react";
import {PlayerData} from "../App/App.tsx";

export const PlayerContext = createContext<PlayerData | null> (null)
