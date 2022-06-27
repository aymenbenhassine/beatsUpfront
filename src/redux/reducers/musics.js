export default (musics = [], action) => {
  switch (action.type) {
    case 'DELETE':
      return musics.filter((music) => music._id !== action.payload);
    case 'LIKE':
      return musics.map((music) => (music._id === action.payload._id ? action.payload : music));
    case 'UPDATE':
      return musics.map((music) => (music._id === action.payload._id ? action.payload : music));
    case 'FETCH_ALL':
      return action.payload;
    case 'CREATE':
      return [...musics, action.payload];
    default:
      return musics;
  }
};
