import * as api from '../../api';

export const getProduits = async (dispatch) => {
  try {
    const { data } = await api.fetchProduits();
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createProduit = (produit) => async (dispatch) => {
  try {
    const { data } = await api.createProduit(produit);
    localStorage.setItem("addProduct", JSON.stringify(data));
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduit = (id) => async (dispatch) => {
  try {
    await api.deleteProduit(id);
    dispatch({ type: 'DELETE', payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProduit = (id, produit) => async (dispatch) => {
  try {
    const { data } = await api.updateProduit(id, produit);
    dispatch({ type: 'UPDATE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getProduitById = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchProduitbyId(id);
    dispatch({ type: 'FETCH', payload: data });
  } catch (error) {
    console.log(error);
  }
};