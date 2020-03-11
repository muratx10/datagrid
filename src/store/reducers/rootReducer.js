// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  // faArrowDown,
  // faArrowUp,
  faSort,
} from '@fortawesome/free-solid-svg-icons';
import { fakeData } from '../../data/fakeDataGenerator';
import { SORT, SET_CLICKED, RESET_SORT_TYPE } from '../actions/actionTypes';

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
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SORT:
      return {
        ...state,
        sortType: action.sortType,
        icon: action.icon,
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
      };
    default:
      return state;
  }
};

export default rootReducer;
