import {
  faSort,
} from '@fortawesome/free-solid-svg-icons';
import { fakeData } from '../../data/fakeDataGenerator';
import {
  SORT, SET_CLICKED, RESET_SORT_TYPE, ACTIVE_USERS, SORTING_ENUM, SEARCH, SET_ACTIVE, SET_DELETED, DELETE_ROWS, SET_INVISIBLE,
} from '../actions/actionTypes';

const initialState = {
  sortType: {
    currency: '',
    amount: '',
  },
  data: fakeData,
  clickedField: '',
  icon: {
    currency: faSort,
    amount: faSort,
  },
  activeRows: [],
  deletedRows: [],
  invisibleColumns: [],
  // 'Name', 'Gender', 'Date of Birth', 'Address', 'Bank', 'Currency', 'Balance', 'Card', 'Status',
  search: '',
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
      };
    case 'TABLE_SEARCH':
      return { ...state, search: action.payload };
    case SORT:
      return {
        ...state,
        sortType: action.sortType,
        icon: action.icon || { currency: faSort, amount: faSort },
        data: action.data || fakeData,
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
        // data: fakeData,
      };
    case ACTIVE_USERS:
      return {
        ...state,
        showActiveUsers: action.isActive,
        data: action.data || fakeData,
      };
    case SORTING_ENUM:
      return {
        ...state,
        data: action.data,
      };
    // case SEARCH:
    //   return {
    //     ...state,
    //     data: action.data,
    //   };
    case SET_ACTIVE:
      return {
        ...state,
        activeRows: action.activeRows,
      };
    case SET_DELETED:
      return {
        ...state,
        deletedRows: [...state.deletedRows, action.payload],
      };
    default:
      return state;
  }
};

export default rootReducer;
