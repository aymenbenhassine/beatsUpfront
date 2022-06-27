export default (quizzes = [], action) => {
    switch (action.type) {
      case 'DELETE':
        return quizzes.filter((quiz) => quiz._id !== action.payload);
      case 'UPDATE':
        return quizzes.map((quiz) => (quiz._id === action.payload._id ? action.payload : quiz));
      case 'FETCH_ALL':
        return action.payload;
      case 'CREATE':
        return [...quizzes, action.payload];
      default:
        return quizzes;
    }
  };