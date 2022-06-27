import * as api from '../../api';

export const getWishList = async (dispatch) => {
  try {
    const { data } = await api.fetchWishList();

    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getWishListByIdUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchWishByIdUser(id);

    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createWish = (wish) => async (dispatch) => {
  try {
    const { data } = await api.createWishList(wish);
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteWishList = (id) => async (dispatch) => {
 
    try {
      await api.deleteWishList(id);
      dispatch({ type: 'DELETE', payload: id });
    } catch (error) {
      console.log(error.message);
    }
  };

export const deleteWishListByIdUserAndIdCourse = (idUser,idCourse) => async (dispatch) => {
 
    try {
      await api.deleteWishList(idUser,idCourse);
      dispatch({ type: 'DELETE', payload: idUser,idCourse });
    } catch (error) {
      console.log(error.message);
    }
  };