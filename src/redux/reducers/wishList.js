export default (wishlist = [], action) => {
    switch (action.type) {
      case 'DELETE':
        return wishlist.filter((wish) => wish._id !== action.payload);
      case 'FETCH_ALL':
        return action.payload;
      case 'CREATE':
        return [...wishlist, action.payload];
  
      default:
        return wishlist;
    }
  };
  