import { SORT_ASC } from './actionTypes';

const _ = require('lodash');

export function sortAsc(sortType, data) {
  return {
    type: SORT_ASC,
    sortType,
    data,
  };
}

export function sort(field) {
  return (dispatch, getState) => {
    const state = getState();
    if (state.sortType[field] === '') {
      const { sortType } = state;
      sortType[field] = 'asc';
      const data = _.orderBy(state.data, [field], 'asc');
      dispatch(sortAsc(sortType, data));
    }
  }
  // if (sortType[field] === '') {
  //   const sortTypeImm = { ...sortType };
  //   sortTypeImm[field] = 'asc';
  //   setSortType(sortTypeImm);
  //   const fakeCopy = _.orderBy(fake, [field], ['asc']);
  //   setFake(fakeCopy);
  // } else if (sortType[field] === 'asc') {
  //   const sortTypeImm = { ...sortType };
  //   sortTypeImm[field] = 'desc';
  //   setSortType(sortTypeImm);
  //   const fakeCopy = _.orderBy(fake, [field], ['desc']);
  //   setFake(fakeCopy);
  // } else {
  //   const sortTypeImm = { ...sortType };
  //   sortTypeImm[field] = '';
  //   setSortType(sortTypeImm);
  //   setFake(fakeData);
  // }
  // setClickedField([field]);
}
