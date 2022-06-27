export const getMusicsStart = () => ({
  type: "GET_MUSICS_START",
});
export const getMusicsSuccess = (musics) => ({
  type: "GET_MUSICS_SUCCESS",
  payload: musics,
});
export const getMusicsFailure = () => ({
  type: "GET_MUSICS_FAILURE",
});