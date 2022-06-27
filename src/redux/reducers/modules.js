export default (modules = [], action) => {
  switch (action.type) {
    case 'DELETE':
      return modules.filter((module) => module._id !== action.payload);
    case 'UPDATE':
      return modules.map((module) => (module._id === action.payload._id ? action.payload : module));
    case 'FETCH_ALL':
      return action.payload;
    case 'CREATE':
      return [...modules, action.payload];
    case 'FETCH_ALL_BY_cource':
      return action.payload;
    default:
      return modules;
  }
};
