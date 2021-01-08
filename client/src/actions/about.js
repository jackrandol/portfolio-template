import axios from 'axios';
import {
  LOAD_BIO,
  ABOUT_ERROR,
  ADD_ABOUT,
  UPDATE_ABOUT,
  UPDATE_ABOUT_IMAGE,
} from './types';
import { setAlert } from './alert';

//Load About;
export const loadAbout = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/about');
    dispatch({
      type: LOAD_BIO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ABOUT_ERROR,
    });
  }
};

export const addAbout = (aboutData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/about', aboutData);
    dispatch({
      type: ADD_ABOUT,
      payload: res.data,
    });
    dispatch(setAlert('Bio Saved', 'success'));
  } catch (err) {
    console.log(err);
    dispatch({
      type: ABOUT_ERROR,
    });
  }
};

export const updateAboutImage = (aboutData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/about/image', aboutData);
    dispatch({
      type: UPDATE_ABOUT_IMAGE,
      payload: res.data,
    });
    dispatch(setAlert('Bio Image Saved', 'success'));
  } catch (error) {
    console.log(error);
    dispatch({
      type: ABOUT_ERROR,
    });
  }
};

export const updateAbout = (aboutData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/about', aboutData);
    dispatch({
      type: UPDATE_ABOUT,
      payload: res.data,
    });
    dispatch(setAlert('Bio Saved', 'success'));
  } catch (err) {
    dispatch({
      type: ABOUT_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
