// @flow

import { receivedAddBook, receivedEditBook } from "./actions";

export const addNewBook =
  (book) => (dispatch: ReduxDispatch, getState: ImmutableMap) => {
    return dispatch(receivedAddBook(book));
  };

export const editBook =
  (book, index) => (dispatch: ReduxDispatch, getState: any) => {
    dispatch(receivedEditBook(book, index));
  };
