export default (cources = [], action) => {
  switch (action.type) {
    case 'DELETE':
      return cources.filter((cource) => cource._id !== action.payload);
    case 'UPDATE':
      return cources.map((cource) => (cource._id === action.payload._id ? action.payload : cource));
    case 'FETCH_ALL':
      return action.payload;
    case 'FETCH_ALL_SCRAPING':
      return action.payload;
    case 'CREATE':
      return [...cources, action.payload];
    default:
      return cources;
  }
};

