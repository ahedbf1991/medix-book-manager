// @flow

import { fromJS } from "immutable";
import { ADD_BOOK, EDIT_BOOK } from "./actions";

const initialState = fromJS({
  books: [],
  error: {},
  loading: false,
});

function bookProviderReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_BOOK:
      return state.set("books", [...state.get("books"), action.payload.book]);
    case EDIT_BOOK:
      const booksState = [...state.get("books")];
      booksState[action.payload.index] = action.payload.book;
      return state.set("books", booksState);
    default:
      return state;
  }
}

export default bookProviderReducer;
