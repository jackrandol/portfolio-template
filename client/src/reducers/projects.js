import {
  LOAD_PROJECTS,
  PROJECTS_ERROR,
  DELETE_PROJECT,
  ADD_PROJECT,
  PROJECTS_LOADING,
  UPDATE_PROJECT,
} from '../actions/types';

const initialState = {
  projects: [],
  loading: false,
  success: true,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false,
      };
    // case DELETE_PROJECT:
    //   return {
    //     ...state,
    //     projects: state.projects.filter(
    //       (project) => project._id !== action.payload
    //     ),
    //     loading: false,
    //   };
    case ADD_PROJECT:
      return {
        ...state,
        eventList: [...state.eventList, action.payload],
        loading: false,
      };
    case PROJECTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case PROJECTS_ERROR:
      return {
        ...state,
        success: false,
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        eventList: state.eventList.map((event) =>
          event._id === action.payload._id ? action.payload : event
        ),
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
}
