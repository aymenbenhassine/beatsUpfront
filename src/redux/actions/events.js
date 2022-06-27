import * as api from '../api';

export const getEvents = async (dispatch) => {
  try {
    const { data } = await api.fetchEvents();

    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getOneEvent = (id) => async (dispatch) => {
  try {
    await api.getOneEvent(id);

    dispatch({ type: 'FETCH_ONE', payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const createEvents = (Event) => async (dispatch) => {
    try {
      const { data } = await api.createEvents(Event);
  
      dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const updateEvents = (id, Event) => async (dispatch) => {
    try {
      const { data } = await api.updateEvents(id, Event);
  
      dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  export const deleteEvents = (id) => async (dispatch) => {
    try {
      await api.deleteEvents(id);
  
      dispatch({ type: 'DELETE', payload: id });
    } catch (error) {
      console.log(error.message);
    }
  };
  