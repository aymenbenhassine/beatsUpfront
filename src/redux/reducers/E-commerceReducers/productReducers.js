export default (produits = [], action) => {
  switch (action.type) {
    case 'DELETE':
      return produits.filter((produit) => produit._id !== action.payload);
    case 'UPDATE':
      return produits.map((produit) => (produit._id === action.payload._id ? action.payload : produit));
    case 'FETCH_ALL':
      return action.payload;
    case 'CREATE':
      return [...produits, action.payload];
    case 'FETCH':
      return action.payload;
    default:
      return produits;
  }
};