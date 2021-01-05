import { LOAD_BIO, ABOUT_ERROR } from '../actions/types';

const initialState = { bio: null };

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_BIO:
      return {
        ...state,
        projects: action.payload,
        loading: false,
      };
    case ABOUT_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
}
