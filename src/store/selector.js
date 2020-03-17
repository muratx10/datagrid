import { createSelector } from 'reselect';

export const filterItem = (data, filterText) => {
  if (!filterText) return data;

  try {
    const filterRegex = new RegExp(filterText, 'i');
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
    ].find((str) => filterRegex.test(str)));
  } catch (e) {
    return data;
  }
};

export const filterData = createSelector(
  (state) => state.data,
  (state) => state.filterText,
  (data, text) => filterItem(data, text),
);
