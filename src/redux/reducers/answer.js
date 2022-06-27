export default (answers = [], action) => {
    switch (action.type) {
      case 'DELETE':
        return answers.filter((answer) => answer._id !== action.payload);
      case 'UPDATE':
        return answers.map((answer) => (answer._id === action.payload._id ? action.payload : answer  ));
      case 'FETCH_ALL':
        return action.payload;
      case 'FETCH_ALL_BY_QUIZ':
        return action.payload;
      case 'CREATE':
        return [...answers, action.payload];
      default:
        return answers;
    }
  };