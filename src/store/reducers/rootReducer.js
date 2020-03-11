import { fakeData } from '../../data/fakeDataGenerator';
import { SORT_ASC } from '../actions/actionTypes';

const initialState = {
  sortType: {
    currency: '',
    amount: '',
  },
  data: fakeData,
  clickedField: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SORT_ASC:
      return {
        sortType: action.sortType,
        data: action.data,
      };
    default:
      return state;
  }
};

export default rootReducer;
