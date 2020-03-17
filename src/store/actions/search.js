import { SEARCH } from "./actionTypes";

function setSearchAction(search) {
  return { type: SEARCH, payload: search };
}

export default function setSearch(search) {
  return (dispatch, getState) => {
    const state = getState();
    localStorage.setItem('reduxState', JSON.stringify(state));
    dispatch(setSearchAction(search));
  };
}
