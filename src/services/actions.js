// @flow

export const ADD_BOOK = "app/BOOK/ADD";
export const EDIT_BOOK = "app/BOOK/EDIT";

export const receivedAddBook = (book): GenericActionType => ({
  type: ADD_BOOK,
  payload: {
    book,
  },
});

export const receivedEditBook = (book, index): GenericActionType => ({
  type: EDIT_BOOK,
  payload: {
    book,
    index,
  },
});
