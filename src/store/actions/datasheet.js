import {
  faArrowDown,
  faArrowUp,
  faSort,
} from '@fortawesome/free-solid-svg-icons';

import {
  SORT,
  SET_CLICKED,
  RESET_SORT_TYPE,
  ACTIVE_USERS,
  SORTING_ENUM,
} from './actionTypes';

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

export function setActiveUsers(isActive, data) {
  return {
    type: ACTIVE_USERS,
    isActive,
    data,
  };
}

export function toggleActiveUsers(isActive) {
  return (dispatch, getState) => {
    const { data } = getState();
    if (isActive) {
      const activeUsers = _.filter(data, 'isActive');
      dispatch(setActiveUsers(isActive, activeUsers));
    } else {
      dispatch(setActiveUsers(isActive));
    }
  };
}

export function sort({ event, field }) {
  return (dispatch, getState) => {
    if (event.shiftKey) {
      event.preventDefault();
      const {
        sortType, icon, data, clickedField,
      } = getState();
      if (clickedField === '' || clickedField === field) return; // 1 and 2
      if (sortType[field] === '') { // 3
        sortType[field] = 'asc';
        icon[field] = faArrowDown;
        const sortedData = _.orderBy(data, [clickedField, field], [sortType[clickedField], 'asc']);
        dispatch(sorting(sortType, icon, sortedData));
      } else if (sortType[field] === 'asc') {
        sortType[field] = 'desc';
        icon[field] = faArrowUp;
        const sortedData = _.orderBy(data, [clickedField, field], [sortType[clickedField], 'desc']);
        dispatch(sorting(sortType, icon, sortedData));
      } else {
        sortType[field] = '';
        icon[field] = faSort;
        const sortedData = _.orderBy(data, [clickedField], [sortType[clickedField]]);
        dispatch(sorting(sortType, icon, sortedData));
      }

      return;
    }
    const clicked = getState().clickedField;
    if (clicked !== field) {
      dispatch(resetSortType());
    }

    const typeSort = getState().sortType;
    if (typeSort[field] === '') {
      dispatch(resetSortType());
      const { sortType, icon, data } = getState();
      sortType[field] = 'asc';
      icon[field] = faArrowDown;
      const sortedData = _.orderBy(data, [field], 'asc');
      dispatch(sorting(sortType, icon, sortedData));
    } else if (typeSort[field] === 'asc') {
      dispatch(resetSortType());
      const { sortType, icon, data } = getState();
      sortType[field] = 'desc';
      icon[field] = faArrowUp;
      const sortedData = _.orderBy(data, [field], 'desc');
      dispatch(sorting(sortType, icon, sortedData));
    } else {
      dispatch(resetSortType());
    }
    dispatch(setClicked(field));
  };
}

export function sortingEnum(data) {
  return {
    type: SORTING_ENUM,
    data,
  };
}

export function sortEnum(chosenItems) {
  return (dispatch, getState) => {
    dispatch(resetSortType());
    if (chosenItems.length === 0) {
      const sortedData = [];
      console.log('-------------------');
      dispatch(sortingEnum(sortedData));
      return;
    }

    const { data } = getState();
    const chosenFields = chosenItems.map((obj) => obj.value);
    // const sortedData = data.filter((item) => item.card === 'Visa'); // а умный путь?
    const sortedData = _.filter(data, (item) => item.card === chosenFields[0] || item.card === chosenFields[1] || item.card === chosenFields[2]); // а умный путь?
    console.log(sortedData);

    dispatch(sortingEnum(sortedData));
  };
}

// export function sortEnum(chosenItems) {
//   return (dispatch) => {
//     dispatch(resetSortType());
//     const { data } = getState();
//     const sortedData = _.filter(data, (item) => item.card === 'Visa');
//     dispatch(sortingEnum(chosenItems));
//   };
// }
