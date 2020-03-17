import { createSelector } from 'reselect';

const _ = require('lodash');
// const _ = require('lodash');

// export const getFilteredRows = (students, search) => {
//   if (!search) {
//     return students;
//   }

//   try {
//     const searchRegex = new RegExp(search, 'i'); // no escaping is a feature!
//     return students.filter((row) => [row.name, row.githubId, row.locationName].find((str) => searchRegex.test(str)));
//   } catch (e) {
//     // ignore filter if regexp is not parsable
//     return students;
//   }
// };

// const filterAndSort = (data, search, sort) => _.orderBy(getFilteredRows(data, search), sort[0], sort[1]);

// export const rowsSelector = createSelector(
//   (state) => state.table,
//   (state) => state.students.data,
//   ({ search, sort }, students) => filterAndSort(students, search, sort),
// );

// export const showRows = (data, deletedRows) => {
//   console.log('inside selector');

//   if (deletedRows.size === 0) return data;
//   // try {
//   return data.filter((row) => {
//     console.log(row.id);

//     return !deletedRows.has(row.id);
//   });
//   // } catch (e) {
//   //   return data;
//   // }
// };

const filtersAndSort = (data, deletedRows, showActiveOnly, invisibleCards, search, sort1, sort2) => {
  console.log('inside selector');

  if (deletedRows.length === 0 && localStorage.getItem('reduxState') === null) {
    return data;
  }
  let newData = [...data];
  // const localState = JSON.parse(localStorage.getItem('reduxState'));

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
  // if (localState.invisibleColumns.length !== 0) { // only for exportCSV
  //   newData = newData.map((row) => {
  //     const clone = { ...row };
  //     // localState.invisibleColumns.forEach((item) => { delete clone[item]; });
  //     delete clone.gender;
  //     console.log(clone); // invisible columns
  //     return clone;
  //   });
  // }
  return newData;
  // return data.filter((row) => !deletedRows.includes(row.id));
  // return data.map((row) => {
  //   const clone = { ...row };
  //   delete clone.card; // invisible columns
  //   return clone;
  // });
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
// const searchItem = (data, searchText) => {

//   if (!searchText) return data;

//   try {
//     const searchRegex = new RegExp(searchText, 'i');
//     return data.filter((row) => [
//       row.name,
//       row.birthDate,
//       row.amount,
//       row.bankName,
//       row.currency,
//       row.gender,
//       row.card,
//       row.locationName.city,
//       row.locationName.zipcode,
//     ].find((str) => searchRegex.test(str)));
//   } catch (e) {
//     return data;
//   }
// };

// const rowsSelector = createSelector(
//   (state) => state.data,
//   (state) => state.search,
//   (data, search) => searchItem(data, search)
// );

export default rowsSelector;
