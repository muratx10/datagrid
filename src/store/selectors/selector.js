import { createSelector } from 'reselect';

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

const showRows = (data, deletedRows) => {
  console.log('inside selector');

  if (deletedRows.length === 0) return data;
  return data.filter((row) => !deletedRows.includes(row.id));
};

const rowsSelector = createSelector(
  (state) => state.data,
  (state) => state.deletedRows,
  (data, deletedRows) => showRows(data, deletedRows)
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
