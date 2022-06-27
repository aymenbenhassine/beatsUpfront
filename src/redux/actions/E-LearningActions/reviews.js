import * as api from '../../api';

export const getReviews = async (dispatch) => {
  try {
    const { data } = await api.fetchReviews();
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getReviewsByIdCourse = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchReviewsByIdCourse(id);
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createReview = (review) => async (dispatch) => {
  try {
    const { data } = await api.createReview(review);
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteReview = (id) => async (dispatch) => {
 
    try {
      await api.deleteReview(id);
      dispatch({ type: 'DELETE', payload: id });
    } catch (error) {
      console.log(error.message);
    }
  };
