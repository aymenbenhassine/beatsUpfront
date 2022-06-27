import * as api from '../../api';


export const getCourses = async (dispatch) => {
  try {
    const { data } = await api.fetchCourses();

    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getCoursesByIdUser = (idUser) => async (dispatch) => {
  try {
    const { data } = await api.fetchCoursesByIdUser(idUser);

    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const ScrapingCourses = (query) => async (dispatch) => {
  try {
    const { data } = await api.scrapCourses(query);

    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const createCourse = (course) => async (dispatch) => {
  try {
    const { data } = await api.createCourse(course);
    localStorage.setItem("addedCourse",JSON.stringify(data))
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateCourse = (id, course) => async (dispatch) => {
  try {
    const { data } = await api.updateCourse(id, course);
    dispatch({ type: 'UPDATE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCourse = (id) => async (dispatch) => {
  
  try {
    await api.deleteCourse(id);
    dispatch({ type: 'DELETE', payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
