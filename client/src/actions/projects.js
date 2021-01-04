import axios from 'axios';
import {
  LOAD_PROJECTS,
  PROJECTS_ERROR,
  PROJECTS_LOADING,
  ADD_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from './types';

//Load Projects;
export const loadProjects = () => async (dispatch) => {
  dispatch(setProjectsLoading());
  try {
    const res = await axios.get('/api/projects');
    dispatch({
      type: LOAD_PROJECTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECTS_ERROR,
    });
  }
};

export const setProjectsLoading = () => {
  return {
    type: PROJECTS_LOADING,
  };
};

export const addProject = (project) => async (dispatch) => {
  dispatch(setProjectsLoading());
  try {
    const res = await axios.post('/api/projects', project);
    dispatch({
      type: ADD_PROJECT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PROJECTS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteProject = (id) => (dispatch) => {
  dispatch(setProjectsLoading());
  axios.delete(`/api/projects/${id}`).then((res) =>
    dispatch({
      type: DELETE_PROJECT,
      payload: id,
    })
  );
};

export const updateProject = (project) => (dispatch) => {
  dispatch(setProjectsLoading());
  axios.post(`/api/projects/`, project).then((res) =>
    dispatch({
      type: UPDATE_PROJECT,
      payload: res.data,
    })
  );
};
