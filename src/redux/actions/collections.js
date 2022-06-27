import * as api from '../api';

export const getCollections = async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });
    const { data } = await api.fetchCollections();

    dispatch({ type: 'FETCH_ALL', payload: data });
    dispatch({ type: 'END_LOADING' });
  } catch (error) {
    console.log(error);
  }
};

export const getCollectionsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });
    const { data: { data } } = await api.fetchCollectionsBySearch(searchQuery);

    dispatch({ type: 'FETCH_BY_SEARCH', payload: data });
    dispatch({ type: 'END_LOADING' });
  } catch (error) {
    console.log(error);
  }
};

export const getCollectionsPaginate = (page) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchCollectionsPaginate(page);

    dispatch({ type: 'FETCH_ALL_PAGINATE', payload: { data, currentPage, numberOfPages } });
    dispatch({ type: 'END_LOADING' });
  } catch (error) {
    console.log(error);
  }
};

export const createCollection = (collection) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });
    const { data } = await api.createCollection(collection);

    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateCollection = (id, collection) => async (dispatch) => {
  try {
    const { data } = await api.updateCollection(id, collection);

    dispatch({ type: 'UPDATE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCollection = (id) => async (dispatch) => {
  try {
    await api.deleteCollection(id);

    dispatch({ type: 'DELETE', payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const likeCollection = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.likeCollection(id, userId);

    dispatch({ type: 'LIKE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
