import { DELETE_ROWS, SET_INVISIBLE } from './actionTypes';

export function deleteSelectedRows() {
  return {
    type: DELETE_ROWS,
  };
}

function setInvisible(invisibleColumns) {
  return {
    type: SET_INVISIBLE,
    payload: invisibleColumns,
  };
}

export function setInvisibleColumn(id) {
  return (dispatch, getState) => {

    const { invisibleColumns } = getState();
    const clone = [...invisibleColumns];
    if (clone.includes(id)) {
      clone.splice(clone.indexOf(id), 1);
    } else {
      clone.push(id);
    }
    dispatch(setInvisible(clone));
  };
}
