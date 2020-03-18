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
  SORTING_ENUM, TURBO_MODE,
} from './actionTypes';

const _ = require('lodash');



export function setClicked(field) {
  return {
    type: SET_CLICKED,
    field,
  };
}

function sorting(clone1, clone2) {
  return {
    type: SORT, clone1, clone2,
  };
}
export function sort({ event, field }) {
  return (dispatch, getState) => {
    const state = getState();
    localStorage.setItem('reduxState', JSON.stringify(state));

    const { sort1, sort2 } = getState();
    let clone1 = [...sort1];
    let clone2 = [...sort2];
    if (event.shiftKey) {
      if (sort1[0] === field) {
        if (sort1[1] === '' || sort1[1] === 'desc') {
          clone1[1] = 'asc';
          dispatch(sorting(clone1, clone2));
        } else {
          clone1[1] = 'desc';
          dispatch(sorting(clone1, clone2));
        }
      } else if (sort1[0] === '') {
        clone1[0] = field;
        clone1[1] = 'asc';
        dispatch(sorting(clone1, clone2));
      } else {
        clone2[0] = field;
        if (sort2[1] === 'asc') {
          clone2[1] = 'desc';
          dispatch(sorting(clone1, clone2));
        } else {
          clone2[1] = 'asc';
          dispatch(sorting(clone1, clone2));
        }
      }
      return;
    }

    if (sort2[0] !== '') {
      clone1 = ['', ''];
      clone2 = ['', ''];
    }

    if (sort1[0] === field || sort1[0] === '') {
      if (sort1[1] === '' || sort1[1] === 'desc') {
        clone1[0] = field;
        clone1[1] = 'asc';
        dispatch(sorting(clone1, clone2));
      } else {
        clone1[1] = 'desc';
        dispatch(sorting(clone1, clone2));
      }
    } else {
      clone1[0] = field;
      clone1[1] = 'asc';
      dispatch(sorting(clone1, clone2));
    }
  };
}

function setActiveUsers(str) {
  return {
    type: ACTIVE_USERS,
    payload: str,
  };
}

export function toggleActiveUsers() {
  return (dispatch, getState) => {
    const state = getState();
    localStorage.setItem('reduxState', JSON.stringify(state));
    const { showActiveOnly } = getState();
    if (showActiveOnly === 'no') {
      dispatch(setActiveUsers('yes'));
    } else {
      dispatch(setActiveUsers('no'));
    }
  };
}

export function setTurboMode(isTurboModeOn) {
  return {
    type: TURBO_MODE,
    isTurboModeOn,
  };
}

function sortingEnum(chosenItems) {
  return {
    type: SORTING_ENUM,
    payload: chosenItems,
  };
}

export function sortEnum(chosenItems) {
  return (dispatch, getState) => {
    const state = getState();
    localStorage.setItem('reduxState', JSON.stringify(state));
    dispatch(sortingEnum(chosenItems || []));
  };
}
