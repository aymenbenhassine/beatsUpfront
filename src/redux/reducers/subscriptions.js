export default (subscriptions = [], action) => {
  switch (action.type) {
    case 'DELETE':
      return subscriptions.filter((subscription) => subscription._id !== action.payload);
    case 'FETCH_ALL':
      return action.payload;
    case 'CREATE':
      return [...subscriptions, action.payload];

    default:
      return subscriptions;
  }
};
