import * as api from '../../api';

export const getModules = async (dispatch) => {
  try {
    const { data } = await api.fetchModules();
    console.log('getting');
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getModulesByIdCource = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchModulesbyIdCource(id);

    dispatch({ type: 'FETCH_ALL_BY_cource', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createModule = (module) => async (dispatch) => {
  try {
    const { data } = await api.createModule(module);
    localStorage.setItem("addedModule",JSON.stringify(data))
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateModule = (id, module) => async (dispatch) => {
  try {
    const { data } = await api.updateCourse(id, module);

    dispatch({ type: 'UPDATE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteModule = (id) => async (dispatch) => {
  console.log('deliddddddd');
  console.log(id);
  try {
    await api.deleteModule(id);
    dispatch({ type: 'DELETE', payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
