export default (state = { isLoading: true, collections: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };

    case 'FETCH_ALL':
      return { ...state, collections: action.payload };
    case 'FETCH_BY_SEARCH':
      return { ...state, collections: action.payload };
    case 'FETCH_ALL_PAGINATE':
      return { ...state, collections: action.payload.data, currentPage: action.payload.currentPage, numberOfPages: action.payload.numberOfPages };
    case 'DELETE':
      return { ...state, collections: state.collections.filter((collection) => collection._id !== action.payload) };
    case 'LIKE':
      return { ...state, collections: state.collections.map((collection) => (collection._id === action.payload._id ? action.payload : collection)) };
    case 'UPDATE':
      return { ...state, collections: state.collections.map((collection) => (collection._id === action.payload._id ? action.payload : collection)) };
    case 'CREATE':
      return { ...state, collections: [...state.collections, action.payload] };
    default:
      return state;
  }
};
