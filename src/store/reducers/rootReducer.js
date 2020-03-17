import {
  faSort,
} from '@fortawesome/free-solid-svg-icons';
import { fakeData } from '../../data/fakeDataGenerator';
import {
  SORT,
  SET_CLICKED,
  RESET_SORT_TYPE,
  ACTIVE_USERS,
  SORTING_ENUM,
  SET_ACTIVE,
  SET_DELETED,
  DELETE_ROWS,
  SET_INVISIBLE,
  TURBO_MODE,
  SEARCH,
} from '../actions/actionTypes';

const initialState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {
    sortType: {
      currency: '',
      amount: '',
    },
    sort1: ['', ''],
    sort2: ['', ''],
    data: fakeData,
    clickedField: '',
    icon: {
      currency: faSort,
      amount: faSort,
    },
    showActiveOnly: 'no',
    activeRows: [],
    deletedRows: [],
    invisibleColumns: [],
    invisibleCards: [],
    search: '',
    turboMode: true,
  };
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INVISIBLE:
      return {
        ...state,
        invisibleColumns: action.payload,
      };
    case DELETE_ROWS:
      return {
        ...state,
        deletedRows: [...state.deletedRows, ...state.activeRows],
        activeRows: [],
      };
    case SEARCH:
      return { ...state, search: action.payload };
    case SORT:
      return {
        ...state,
        sort1: [...action.clone1],
        sort2: [...action.clone2],
      };
    case SET_CLICKED:
      return {
        ...state,
        clickedField: action.field,
      };
    case RESET_SORT_TYPE:
      return {
        ...state,
        sortType: {
          currency: '',
          amount: '',
        },
        icon: {
          currency: faSort,
          amount: faSort,
        },
      };
    case ACTIVE_USERS:
      return {
        ...state,
        showActiveOnly: action.payload,
        // data: action.data || fakeData,
      };
    case TURBO_MODE:
      return {
        ...state,
        isTurboModeOn: action.isTurboModeOn,
      };
    case SORTING_ENUM:
      return {
        ...state,
        invisibleCards: [...action.payload],
      };
    case SET_ACTIVE:
      return {
        ...state,
        activeRows: action.payload,
      };
    case SET_DELETED:
      return {
        ...state,
        deletedRows: [...state.deletedRows, action.payload],
        activeRows: [],
      };
    default:
      return state;
  }
};

export default rootReducer;
