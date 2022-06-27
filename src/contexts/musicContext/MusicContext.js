import { createContext, useReducer } from "react";
import MusicReducer from "./MusicReducer";

const INITIAL_STATE = {
  musics: [],
  isFetching: false,
  error: false,
};

export const MusicContext = createContext(INITIAL_STATE);

export const MusicContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MusicReducer, INITIAL_STATE);

  return (
    <MusicContext.Provider
      value={{
        musics: state.musics,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};