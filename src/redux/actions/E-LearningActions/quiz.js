import * as api from '../../api';

export const getQuiz= async (dispatch) => {
  try {
    const { data } = await api.fetchQuiz();

    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getQuizByIdUser=(id)=> async (dispatch) => {
  try {
    const { data } = await api.fetchQuizByIdUser(id);

    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getQuizByIdCourse=(id)=> async (dispatch) => {
  try {
    const { data } = await api.fetchQuizByIdModule(id);
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createQuiz = (quiz) => async (dispatch) => {
  try {

    const { data } = await api.createQuiz(quiz);
    await localStorage.setItem('addedQuiz', JSON.stringify(data));
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateQuiz = (id, quiz) => async (dispatch) => {
  try {
    const { data } = await api.updateQuiz(id, quiz);
    await localStorage.setItem('addedQuiz', JSON.stringify(data));
    dispatch({ type: 'UPDATE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteQuiz = (id) => async (dispatch) => {
  try {
    await api.deleteQuiz(id);
    dispatch({ type: 'DELETE', payload: id });
  } catch (error) {
    console.log(error.message);
  }
};