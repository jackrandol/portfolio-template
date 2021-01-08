import {
  LOAD_BIO,
  ABOUT_ERROR,
  ADD_ABOUT,
  UPDATE_ABOUT,
  UPDATE_ABOUT_IMAGE,
} from '../actions/types';

const initialState = { bio: null, id: null, image: {} };

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_BIO:
      return {
        ...state,
        bio: action.payload[0].bio,
        id: action.payload[0]._id,
        image: action.payload[0].image,
        loading: false,
      };
    case ABOUT_ERROR:
      return {
        ...state,
        loading: false,
        error: 'something went wrong',
      };
    case ADD_ABOUT:
    case UPDATE_ABOUT:
      return {
        ...state,
        bio: action.payload.bio,
        id: action.payload._id,
        loading: false,
      };
    case UPDATE_ABOUT_IMAGE:
      return {
        ...state,
        image: action.payload.image,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
}
