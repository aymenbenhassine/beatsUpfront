import * as api from '../api';

export const getKaraokes = async (dispatch) => {
  try {
    const { data } = await api.fetchKaraokes();

    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const createKaraokes = (Karaoke) => async (dispatch) => {
    try {
      const { data } = await api.createKaraokes(Karaoke);
  
      dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const updateKaraokes = (id, Karaoke) => async (dispatch) => {
    try {
      const { data } = await api.updateKaraokes(id, Karaoke);
  
      dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  export const deleteKaraokes = (id) => async (dispatch) => {
    try {
      await api.deleteKaraokes(id);
  
      dispatch({ type: 'DELETE', payload: id });
    } catch (error) {
      console.log(error.message);
    }
  };
  