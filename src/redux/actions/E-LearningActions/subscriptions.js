import * as api from '../../api';

export const getSubscriptions = async (dispatch) => {
  try {
    const { data } = await api.fetchSubscription();

    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getSubscriptionsIdUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchSubscriptionByIdUser(id);

    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createSubscription = (subscription) => async (dispatch) => {
  try {
    const { data } = await api.createSubscription(subscription);
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteSubscription = (id) => async (dispatch) => {
 
    try {
      await api.deleteSubscription(id);
      dispatch({ type: 'DELETE', payload: id });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const deleteSubscriptionByIdUserAndIdCourse = (idUser,idCourse) => async (dispatch) => {
 
    try {
      await api.deleteSubscriptionByIdUserAndIdCourse(idUser,idCourse);
      dispatch({ type: 'DELETE', payload: idUser,idCourse });
    } catch (error) {
      console.log(error.message);
    }
  };