import * as api from '../../api';


export const createAnswer = (answer) => async (dispatch) => {
    try {
      const { data } = await api.createAnswer(answer);
      dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
      console.log(error);
    }
  };