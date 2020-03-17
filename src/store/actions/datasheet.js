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

// function resetSortType() {
//   return {
//     type: RESET_SORT_TYPE,
//   };
// }
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
  // return (dispatch, getState) => {
  //   if (event.shiftKey) {
  //     event.preventDefault();
  //     const {
  //       sortType, icon, data, clickedField,
  //     } = getState();
  //     if (clickedField === '' || clickedField === field) return; // 1 and 2
  //     if (sortType[field] === '') { // 3
  //       sortType[field] = 'asc';
  //       icon[field] = faArrowDown;
  //       const sortedData = _.orderBy(data, [clickedField, field], [sortType[clickedField], 'asc']);
  //       dispatch(sorting(sortType, icon, sortedData));
  //     } else if (sortType[field] === 'asc') {
  //       sortType[field] = 'desc';
  //       icon[field] = faArrowUp;
  //       const sortedData = _.orderBy(data, [clickedField, field], [sortType[clickedField], 'desc']);
  //       dispatch(sorting(sortType, icon, sortedData));
  //     } else {
  //       sortType[field] = '';
  //       icon[field] = faSort;
  //       const sortedData = _.orderBy(data, [clickedField], [sortType[clickedField]]);
  //       dispatch(sorting(sortType, icon, sortedData));
  //     }

  //     return;
  //   }
  //   const clicked = getState().clickedField;
  //   if (clicked !== field) {
  //     dispatch(resetSortType());
  //   }

  //   const typeSort = getState().sortType;
  //   if (typeSort[field] === '') {
  //     dispatch(resetSortType());
  //     const { sortType, icon, data } = getState();
  //     sortType[field] = 'asc';
  //     icon[field] = faArrowDown;
  //     const sortedData = _.orderBy(data, [field], 'asc');
  //     dispatch(sorting(sortType, icon, sortedData));
  //   } else if (typeSort[field] === 'asc') {
  //     dispatch(resetSortType());
  //     const { sortType, icon, data } = getState();
  //     sortType[field] = 'desc';
  //     icon[field] = faArrowUp;
  //     const sortedData = _.orderBy(data, [field], 'desc');
  //     dispatch(sorting(sortType, icon, sortedData));
  //   } else {
  //     dispatch(resetSortType());
  //   }
  //   dispatch(setClicked(field));
  // };
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
  // const { data } = getState();
  // if (isActive) {
  //   const activeUsers = _.filter(data, 'isActive');
  //   dispatch(setActiveUsers(isActive, activeUsers));
  // } else {
  //   dispatch(setActiveUsers(isActive));
  // }
  // };
  };
}

export function setTurboMode(isTurboModeOn) {
  return {
    type: TURBO_MODE,
    isTurboModeOn,
  };
}

// export function sort({ event, field }) {
//   return (dispatch, getState) => {
//     if (event.shiftKey) {
//       event.preventDefault();
//       const {
//         sortType, icon, data, clickedField,
//       } = getState();
//       if (clickedField === '' || clickedField === field) return; // 1 and 2
//       if (sortType[field] === '') { // 3
//         sortType[field] = 'asc';
//         icon[field] = faArrowDown;
//         const sortedData = _.orderBy(data, [clickedField, field], [sortType[clickedField], 'asc']);
//         dispatch(sorting(sortType, icon, sortedData));
//       } else if (sortType[field] === 'asc') {
//         sortType[field] = 'desc';
//         icon[field] = faArrowUp;
//         const sortedData = _.orderBy(data, [clickedField, field], [sortType[clickedField], 'desc']);
//         dispatch(sorting(sortType, icon, sortedData));
//       } else {
//         sortType[field] = '';
//         icon[field] = faSort;
//         const sortedData = _.orderBy(data, [clickedField], [sortType[clickedField]]);
//         dispatch(sorting(sortType, icon, sortedData));
//       }

//       return;
//     }
//     const clicked = getState().clickedField;
//     if (clicked !== field) {
//       dispatch(resetSortType());
//     }

//     const typeSort = getState().sortType;
//     if (typeSort[field] === '') {
//       dispatch(resetSortType());
//       const { sortType, icon, data } = getState();
//       sortType[field] = 'asc';
//       icon[field] = faArrowDown;
//       const sortedData = _.orderBy(data, [field], 'asc');
//       dispatch(sorting(sortType, icon, sortedData));
//     } else if (typeSort[field] === 'asc') {
//       dispatch(resetSortType());
//       const { sortType, icon, data } = getState();
//       sortType[field] = 'desc';
//       icon[field] = faArrowUp;
//       const sortedData = _.orderBy(data, [field], 'desc');
//       dispatch(sorting(sortType, icon, sortedData));
//     } else {
//       dispatch(resetSortType());
//     }
//     dispatch(setClicked(field));
//   };
// }

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
    dispatch(sortingEnum(chosenItems));
  };
}
