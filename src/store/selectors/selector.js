import { createSelector } from 'reselect';

const _ = require('lodash');

const filtersAndSort = (data, deletedRows, showActiveOnly, invisibleCards, search, sort1, sort2) => {

  if (deletedRows.length === 0 && localStorage.getItem('reduxState') === null) {
    return data;
  }
  let newData = [...data];

  if (deletedRows.length !== 0) {
    newData = newData.filter((row) => !deletedRows.includes(+row.id));
  }

  if (showActiveOnly === 'yes') {
    newData = newData.filter((row) => row.isActive === true);
  }

  if (invisibleCards.length !== 0) {
    const items = invisibleCards.map((obj) => obj.value);
    newData = newData.filter((row) => !items.includes(row.card));
  }

  if (search.length !== 0) {
    try {
      const searchRegex = new RegExp(search, 'i');
      newData = newData.filter((row) => [
        row.name,
        row.birthDate,
        row.amount,
        row.bankName,
        row.currency,
        row.gender,
        row.card,
        row.locationName.city,
        row.locationName.zipcode,
      ].find((str) => searchRegex.test(str)));
    } catch (e) {
      return newData;
    }
  }

  if (sort1[1] !== '') {
    if (sort2[1] !== '') {
      newData = _.orderBy(newData, [sort1[0], sort2[0]], [sort1[1], sort2[1]]);
    } else {
      newData = _.orderBy(newData, [sort1[0]], [sort1[1]]);
    }
  }
  return newData;
};

const rowsSelector = createSelector(
  (state) => state.data,
  (state) => state.deletedRows,
  (state) => state.showActiveOnly,
  (state) => state.invisibleCards,
  (state) => state.search,
  (state) => state.sort1,
  (state) => state.sort2,
  (data, deletedRows, showActiveOnly, invisibleCards, search, sort1, sort2) => filtersAndSort(data, deletedRows, showActiveOnly, invisibleCards, search, sort1, sort2),
);

export default rowsSelector;
