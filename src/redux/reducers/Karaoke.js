
export default (Karaokes = [], action) => {
    switch (action.type) {
      case 'FETCH_ALL':
        return action.payload;
      case 'DELETE':
        return Karaokes.filter((Karaoke) => Karaoke._id !== action.payload);
      case 'UPDATE':
        return Karaokes.map((Karaoke) => (Karaoke._id === action.payload._id ? action.payload : Karaoke));
      case 'CREATE':
        return [...Karaokes, action.payload];
      default:
        return Karaokes;
    }
  };
  


 


  