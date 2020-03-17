import { SET_INVISIBLE } from './actionTypes';

export default function setInvisibleColumns(chosenItems) {
  return {
    type: SET_INVISIBLE,
    payload: chosenItems,
  };
}
