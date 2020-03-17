import { SET_ACTIVE, SET_DELETED } from './actionTypes';

function setActive(activeRows) {
  return {
    type: SET_ACTIVE,
    activeRows,
  };
}

// export function setActiveRowId(id) {
//   return (dispatch, getState) => {
//     const { activeRows } = getState();
//     if (activeRows.has(+id)) {
//       activeRows.delete(+id);
//     } else {
//       activeRows.add(+id);
//     }
//     dispatch(setActive(activeRows));
//   };
// }

export function setActiveRowId(id) {
  return (dispatch, getState) => {
    const { activeRows } = getState();
    if (activeRows.includes(+id)) {
      activeRows.splice(activeRows.indexOf(+id), 1);
    } else {
      activeRows.push(+id);
    }
    dispatch(setActive(activeRows));
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
