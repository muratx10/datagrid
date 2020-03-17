import { SET_ACTIVE, SET_DELETED } from './actionTypes';

function setActive(activeRows) {
  return {
    type: SET_ACTIVE,
    payload: activeRows,
  };
}

export function setActiveRowId(id) {
  return (dispatch, getState) => {
    const { activeRows } = getState();
    const clone = [...activeRows];
    if (clone.includes(+id)) {
      clone.splice(clone.indexOf(+id), 1);
    } else {
      clone.push(+id);
    }
    dispatch(setActive(clone));
  };
}

export function deleteRow(id) {
  return {
    type: SET_DELETED,
    payload: id,
  };
}

// export function deleteRow(id) {
//   return (dispatch, getState) => {

//     const { activeRows, deletedRows } = getState();
//     if (activeRows.has(id)) {
//       deletedRows.add(id);
//       console.log('deleteRow - if', deletedRows);
//       dispatch(setDeleted(deletedRows));
//     }
//   };
// }

// export function deleteRow(id) {
//   return (dispatch, getState) => {
//     const { activeRows, deletedRows } = getState();
//     if (activeRows.includes(id)) {
//       deletedRows.push(id);
//       dispatch(setDeleted(deletedRows));
//     }
//   };
// }
