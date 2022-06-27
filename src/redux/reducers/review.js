export default (reviews = [], action) => {
    switch (action.type) {
      case 'DELETE':
        return reviews.filter((review) => review._id !== action.payload);
      case 'FETCH_ALL':
        return action.payload;
      case 'CREATE':
        return [...reviews, action.payload];
  
      default:
        return reviews;
    }
  };