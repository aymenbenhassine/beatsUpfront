export default (questions = [], action) => {
    switch (action.type) {
      case 'DELETE':
        return questions.filter((question) => question._id !== action.payload);
      case 'UPDATE':
        return questions.map((question) => (question._id === action.payload._id ? action.payload : question));
      case 'FETCH_ALL':
        return action.payload;
      case 'FETCH_ALL_BY_QUIZ':
        return action.payload;
      case 'CREATE':
        return [...questions, action.payload];
      default:
        return questions;
    }
  };