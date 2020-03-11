import {
  faArrowDown,
  faArrowUp,
  faSort,
} from '@fortawesome/free-solid-svg-icons';
import { SORT, SET_CLICKED, RESET_SORT_TYPE } from './actionTypes';

const _ = require('lodash');

export function sorting(sortType, icon, data) {
  return {
    type: SORT,
    sortType,
    icon,
    data,
  };
}

export function setClicked(field) {
  return {
    type: SET_CLICKED,
    field,
  };
}

export function resetSortType() {
  return {
    type: RESET_SORT_TYPE,
  };
}

export function sort(field) {
  return (dispatch, getState) => {
    if (getState().clickedField !== field) {
      dispatch(resetSortType());
    }

    const { sortType, icon, data } = getState();
    if (getState().sortType[field] === '') {
      sortType[field] = 'asc';
      icon[field] = faArrowDown;
      const sortedData = _.orderBy(data, [field], 'asc');
      dispatch(sorting(sortType, icon, sortedData));
    } else if (sortType[field] === 'asc') {
      sortType[field] = 'desc';
      icon[field] = faArrowUp;
      const sortedData = _.orderBy(data, [field], 'desc');
      dispatch(sorting(sortType, icon, sortedData));
    } else {
      sortType[field] = '';
      icon[field] = faSort;
      dispatch(sorting(sortType, icon));
    }
    dispatch(setClicked(field));
  };
}
