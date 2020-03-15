import { createSelector } from 'reselect';

const getData = (state) => state.data;
const getSearchText = (state) => state.searchText;

const searchItem = (data, searchText) => {
  if (!searchText) return data;

  try {
    const searchRegex = new RegExp(searchText, 'i');
    return data.filter((row) => [
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
    return data;
  }
};

export const searchData = createSelector(
  getData, getSearchText,
);
