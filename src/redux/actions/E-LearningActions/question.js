import * as api from '../../api';

export const getQuestion = async (dispatch) => {
  try {
    const { data } = await api.fetchQuestion();

    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getQuestionByIdQuiz = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchQuestionByIdQuiz(id);

    dispatch({ type: 'FETCH_ALL_BY_QUIZ', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createQuestion = (question) => async (dispatch) => {
  try {
    const { data } = await api.createQuestion(question);
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateQuestion = (id, question) => async (dispatch) => {
  try {
    const { data } = await api.updateQuestion(id, question);

    dispatch({ type: 'UPDATE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteQuestion = (id) => async (dispatch) => {
  try {
    await api.deleteQuestion(id);
    dispatch({ type: 'DELETE', payload: id });
  } catch (error) {
    console.log(error.message);
  }
};