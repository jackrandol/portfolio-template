import axios from 'axios';
import { LOAD_BIO, ABOUT_ERROR } from './types';

//Load bio;
export const loadBio = () => async (dispatch) => {
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
