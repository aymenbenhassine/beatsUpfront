export default (events = [], action) => {
    switch (action.type) {
      case 'FETCH_ALL':
        return action.payload;
        case 'FETCH_ONE':
        return events.filter((event) => event._id !== action.payload._id);
      case 'DELETE':
        return events.filter((event) => event._id !== action.payload);
      case 'UPDATE':
        return events.map((event) => (event._id === action.payload._id ? action.payload : event));
      case 'CREATE':
        return [...events, action.payload];
      default:
        return events;
    }
  };
  


 
  