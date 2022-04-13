// @flow

import { createSelector } from "reselect";
const selectBook = () => (state) => state.book;
const selectBooks = () =>
  createSelector(selectBook(), (substate) => substate.get("books"));
export { selectBook, selectBooks };
