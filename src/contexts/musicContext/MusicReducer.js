const MusicReducer = (state, action) => {
  switch (action.type) {
    case 'GET_MUSICS_START':
      return {
        musics: [],
        isFetching: true,
        error: false,
      };
    case 'GET_MUSICS_SUCCESS':
      return {
        musics: action.payload,
        isFetching: false,
        error: false,
      };
    case 'GET_MUSICS_FAILURE':
      return {
        musics: [],
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default MusicReducer;
