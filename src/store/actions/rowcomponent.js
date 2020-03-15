import { SET_ACTIVE } from './actionTypes';

function setActive(activeRows) {
  return {
    type: SET_ACTIVE,
    activeRows,
  };
}

export default function setActiveRowId(id) {
  return (dispatch, getState) => {
    const { activeRows } = getState();
    if (activeRows.has(id)) {
      activeRows.delete(id);
    } else {
      activeRows.add(id);
    }
    dispatch(setActive(activeRows));
    console.log(activeRows);
  };
}
